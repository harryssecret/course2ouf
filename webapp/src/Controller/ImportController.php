<?php

namespace App\Controller;

use App\Entity\Import;
use App\Entity\Student;
use App\Entity\Grade;
use App\Form\ImportFormType;
use App\Repository\GradeRepository;
use App\Repository\ImportRepository;
use League\Csv\Reader;
use App\Repository\StudentRepository;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route("/import")]
class ImportController extends AbstractController
{
    #[Route("/", name: "app_import", methods: ["GET"])]
    public function index(ImportRepository $importRepository): Response
    {
        return $this->render("import/index.html.twig", [
            "controller_name" => "ImportController",
            "imports" => $importRepository->findAll(),
        ]);
    }

    #[Route("/new", name: "app_send_import", methods: ["GET", "POST"])]
    public function new(
        Request $request,
        SluggerInterface $slugger,
        ImportRepository $importRepository,
        StudentRepository $studentRepository,
        GradeRepository $gradeRepository
    ): Response {
        $import = new Import();
        $form = $this->createForm(ImportFormType::class, $import);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $csvFile = $form->get("csvFile")->getData();

            if ($csvFile) {
                $originalFilename = pathinfo(
                    $csvFile->getClientOriginalName(),
                    PATHINFO_FILENAME
                );
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename =
                    $safeFilename .
                    "-" .
                    uniqid() .
                    "." .
                    $csvFile->guessExtension();

                try {
                    $csvFile->move(
                        $this->getParameter("csv_import_directory"),
                        $newFilename
                    );
                } catch (FileException $th) {
                    echo $th;
                }
            }
            $import->setFilePath($newFilename);
            $import->setUploadedAt(new DateTimeImmutable("now"));
            $importRepository->save($import, true);
            $this->importCsv($import, $studentRepository, $gradeRepository);
            $this->redirectToRoute("app_import");
        }

        return $this->render("import/new.html.twig", [
            "form" => $form->createView(),
        ]);
    }

    private function importCsv(
        Import $import,
        StudentRepository $studentRepository,
        GradeRepository $gradeRepository
    ) {
        $csvLocation = "../uploads/csv_imports/" . $import->getFilePath();
        $csv = Reader::createFromPath($csvLocation)->setHeaderOffset(0);
        foreach ($csv as $record) {
            $student = new Student();
            $student->setFirstname($record["Prenom"]);
            $student->setLastname($record["Nom"]);
            $student->setGender($record["Sexe"]);
            $gradeName = $record["Classe"];

            $grade = $gradeRepository->findOneBy([
                "gradename" => $gradeName,
            ]);
            if ($grade != null) {
                $student->setGrade($grade);
            } else {
                $newGrade = new Grade();
                $newGrade->setgradename($gradeName);
                $gradeRepository->save($newGrade, true);
                $student->setGrade($newGrade);
            }
            $studentRepository->save($student, true);
        }
    }
}
