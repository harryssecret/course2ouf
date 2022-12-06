<?php

namespace App\Controller;

use App\Entity\Import;
use App\Form\ImportFormType;
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
    public function index(): Response
    {
        return $this->render('import/index.html.twig', [
            'controller_name' => 'ImportController',
        ]);
    }

    #[Route('/new', name: 'app_send_import', methods: ['GET', 'POST'])]
    public function new(Request $request, SluggerInterface $slugger): Response
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
                $studentArray = [];
            }

            $this->redirectToRoute('app_import');
        }

        return $this->render('import/new.html.twig', ['form' => $form->createView()]);
    }
}
