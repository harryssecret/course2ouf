<?php

namespace App\Controller;

use App\Entity\Gender;
use App\Entity\Import;
use App\Entity\Student;
use App\Form\ImportFormType;
use App\Repository\ImportRepository;
use App\Repository\StudentRepository;
use DateTimeImmutable;
use DateTimeZone;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/import')]
class ImportController extends AbstractController
{
    #[Route('/', name: 'app_import', methods: ['GET'])]
    public function index(ImportRepository $importRepository): Response
    {
        return $this->render('import/index.html.twig', [
            'controller_name' => 'ImportController',
            'imports' => $importRepository->findAll()
        ]);
    }

    #[Route('/new', name: 'app_send_import', methods: ['GET', 'POST'])]
    public function new(Request $request, SluggerInterface $slugger, ImportRepository $importRepository, StudentRepository $studentRepository): Response
    {
        $import = new Import();
        $form = $this->createForm(ImportFormType::class, $import);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $csvFile = $form->get('csvFile')->getData();

            if ($csvFile) {
                $originalFilename = pathinfo($csvFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $csvFile->guessExtension();

                try {
                    $csvFile->move($this->getParameter("csv_import_directory"), $newFilename);
                } catch (FileException $th) {
                    echo $th;
                }
            }
            $import->setFilePath($newFilename);
            $import->setUploadedAt(new DateTimeImmutable("now"));
            $importRepository->save($import, true);
            $this->importCsv($import, $studentRepository);
            $this->redirectToRoute('app_import');
        }

        return $this->render('import/new.html.twig', ['form' => $form->createView()]);
    }

    private function importCsv(Import $import, StudentRepository $studentRepository)
    {
        $csvLocation = "../uploads/csv_imports/" . $import->getFilePath();
        $studentArray = [];
        if (($handle = fopen($csvLocation, "r")) !== FALSE) {
            while (($data = fgetcsv($handle)) !== FALSE) {
                var_dump($data);
                $firstName = $data[0];
                $lastName = $data[1];
                $gender = $data[2];

                $student = new Student();
                $student->setFirstname($firstName);
                $student->setLastname($lastName);

                switch ($gender) {
                    case 'Homme':
                    case 'homme':
                    case 'h':
                    case 'H':
                        $student->setGender(Gender::Male);
                        break;

                    case 'Femme':
                    case 'femme':
                    case 'F':
                    case 'f':
                        $student->setGender(Gender::Female);
                        break;
                }

                $studentRepository->save($student, true);
            }
            fclose($handle);
        }
    }
}
