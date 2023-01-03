<?php

namespace App\Controller;

use App\Entity\export;
use App\Entity\Ranking;
use App\Form\ExportType;
use App\Repository\ExportRepository;
use App\Repository\RankingRepository;
use League\Csv\Writer;
use DateTimeImmutable;
use SplTempFileObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

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

    #[Route("/new", name: "app_export_add", methods: ["GET", "POST"])]
    public function new(Request $request, RankingRepository $rankingRepository, ExportRepository $exportRepository, SluggerInterface $sluggerInterface): Response
    {
        $export = new Export();
        $form = $this->createForm(ExportType::class, $export);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $scores = $rankingRepository->findAll();
            $export->setCreatedAt(new DateTimeImmutable());
            $path = $this->createExportCsv($sluggerInterface, $export->getCreatedAt(), $scores);
            $export->setPath($path);

            $exportRepository->save($export);

            $this->redirectToRoute("app_export", [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('export/new.html.twig', [
            'form' => $form->createView(),
            'controller_name' => 'ExportController',
        ]);
    }

    public function createExportCsv(SluggerInterface $sluggerInterface, DateTimeImmutable $creationDate, array $scores): string
    {
        $header = ["student", "endRun", "Race"];
        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne($header);
        $csv->insertAll($scores);
        $filename = $sluggerInterface->slug($creationDate->format("d-m-Y_H:i:s")) . "-export.csv";
        $csv->output($filename);
        return $filename;
    }
}
