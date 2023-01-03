<?php

namespace App\Controller;

use App\Entity\export;
use App\Entity\Ranking;
use App\Form\ExportType;
use App\Repository\ExportRepository;
use App\Repository\RankingRepository;
use League\Csv\Writer;
use DateTimeImmutable;
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

    #[Route("/add", name: "app_export_add")]
    public function add(Request $request, RankingRepository $rankingRepository, ExportRepository $exportRepository): Response
    {
        $export = new Export();
        $form = $this->createForm(ExportType::class, $export);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $scores = $rankingRepository->findAll();
            $export->setCreatedAt(new DateTimeImmutable());
        }

        return $this->render('export/add.html.twig', [
            'controller_name' => 'ExportController',
        ]);
    }

    public function createExportCsv(array $scores)
    {
        $header = ["student", "endRun", "Race"];
        $csv = Writer::createFromString();
        $csv->insertOne($header);
        $csv->insertAll($scores);
    }
}
