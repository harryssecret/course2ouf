<?php

namespace App\Controller;

use App\Entity\Import;
use App\Repository\ExportRepository;
use App\Repository\RankingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/export')]
class ExportController extends AbstractController
{
    #[Route('/', name: 'app_export')]
    public function index(ExportRepository $exportRepository): Response
    {
        return $this->render('export/index.html.twig', [
            'controller_name' => 'ExportController',
            'exports' => $exportRepository->findAll(),
        ]);
    }

    #[Route('/{id}', name: 'app_export_show')]
    public function show($id, ExportRepository $exportRepository): Response
    {
        $export = $exportRepository->find($id);
        return $this->render('export/show.html.twig', [
            'controller_name' => 'ExportController',
            'export' => $export,
        ]);
    }

    #Route("/add", name="app_export_add")
    public function add(Request $request, RankingRepository $rankingRepository): Response
    {
        $import = new Import();
        $form = $this->createForm(ImportFormType::class, $import);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $scores = $rankingRepository->findAll();
        }

        return $this->render('export/add.html.twig', [
            'controller_name' => 'ExportController',
        ]);
    }
}
