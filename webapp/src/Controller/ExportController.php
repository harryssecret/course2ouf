<?php

namespace App\Controller;

use App\Entity\export;
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

#[Route("/export")]
class ExportController extends AbstractController
{
    #[Route("/", name: "app_export")]
    public function index(ExportRepository $exportRepository): Response
    {
        return $this->render("export/index.html.twig", [
            "controller_name" => "ExportController",
            "exports" => $exportRepository->findAll(),
        ]);
    }

    #[Route("/new", name: "app_export_add", methods: ["GET", "POST"])]
    public function new(
        Request $request,
        RankingRepository $rankingRepository,
        ExportRepository $exportRepository,
        SluggerInterface $sluggerInterface
    ): Response {
        $export = new Export();
        $form = $this->createForm(ExportType::class, $export);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $creationDate = new DateTimeImmutable();
            $export->setCreatedAt($creationDate);
            $path =
                $sluggerInterface->slug($creationDate->format("d-m-Y_H:i:s")) .
                "-export.csv";
            $export->setPath($path);

            $csv = $this->createExportCsv($rankingRepository->findAll());

            $exportRepository->save($export);

            // TODO : store exports in a folder

            return new Response($csv->output($path), 200, [
                "Content-Encoding" => "none",
                "Content-Type" => "text/csv; charset=UTF-8",
                "Content-Disposition" => 'attachment; filename="' . $path . '"',
                "Content-Description" => "File Transfer",
            ]);
        }

        return $this->render("export/new.html.twig", [
            "form" => $form->createView(),
            "controller_name" => "ExportController",
        ]);
    }

    public function createExportCsv(array $scores): mixed
    {
        $header = ["Prenom", "Nom", "Genre", "Temps", "DateCourse"];
        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne($header);
        foreach ($scores as $score) {
            $csv->insertOne([
                $score->getStudent()->getFirstName(),
                $score->getStudent()->getLastName(),
                $score->getStudent()->getGender(),
                $score->getEndRun()->format("H:i:s"),
                $score->getRace()->getStart()->format("d-m-Y"),
            ]);
        }
        return $csv;
    }
}
