<?php

namespace App\Controller;

use App\Entity\Student;
use App\Form\StudentType;
use App\Repository\StudentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\Routing\Annotation\Route;
use Picqer\Barcode\BarcodeGeneratorPNG;

#[Route("/student")]
class StudentController extends AbstractController
{
    #[Route("/", name: "app_student_index", methods: ["GET"])]
    public function index(StudentRepository $studentRepository): Response
    {
        return $this->render("student/index.html.twig", [
            "students" => $studentRepository->findAll(),
        ]);
    }

    #[Route("/new", name: "app_student_new", methods: ["GET", "POST"])]
    public function new(
        Request $request,
        StudentRepository $studentRepository
    ): Response {
        $student = new Student();
        $form = $this->createForm(StudentType::class, $student);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $studentRepository->save($student, true);

            return $this->redirectToRoute(
                "app_student_index",
                [],
                Response::HTTP_SEE_OTHER
            );
        }

        return $this->renderForm("student/new.html.twig", [
            "student" => $student,
            "form" => $form,
        ]);
    }

    #[Route("/show/{id}", name: "app_student_show", methods: ["GET"])]
    public function show(Student $student): Response
    {
        $generator = new BarcodeGeneratorPNG();
        $barcode = $generator->getBarcode(
            $student->getBarcodeId(),
            $generator::TYPE_CODE_128
        );
        $encodedBarcode = base64_encode($barcode);

        return $this->render("student/show.html.twig", [
            "student" => $student,
            "barcodeImage" => $encodedBarcode,
        ]);
    }

    #[Route("/edit/{id}", name: "app_student_edit", methods: ["GET", "POST"])]
    public function edit(
        Request $request,
        Student $student,
        StudentRepository $studentRepository
    ): Response {
        $form = $this->createForm(StudentType::class, $student);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $studentRepository->save($student, true);

            return $this->redirectToRoute(
                "app_student_index",
                [],
                Response::HTTP_SEE_OTHER
            );
        }

        return $this->renderForm("student/edit.html.twig", [
            "student" => $student,
            "form" => $form,
        ]);
    }

    #[Route("/delete/{id}", name: "app_student_delete", methods: ["POST"])]
    public function delete(
        Request $request,
        Student $student,
        StudentRepository $studentRepository
    ): Response {
        if (
            $this->isCsrfTokenValid(
                "delete" . $student->getId(),
                $request->request->get("_token")
            )
        ) {
            $studentRepository->remove($student, true);
        }

        return $this->redirectToRoute(
            "app_student_index",
            [],
            Response::HTTP_SEE_OTHER
        );
    }


    #[Route("/barcode", name: "app_student_barcode", methods: ["GET"])]
    public function barcode(StudentRepository $studentRepository): Response
    {
        // generate a html page with all barcodes and then convert it to pdf
        $students = $studentRepository->findAll();
        $generator = new BarcodeGeneratorPNG();
        $barcodes = [];
        foreach ($students as $student) {
            $barcode = $generator->getBarcode(
                $student->getBarcodeId(),
                $generator::TYPE_CODE_128
            );
            $encodedBarcode = base64_encode($barcode);
            array_push(
                $barcodes,
                ["image" => $encodedBarcode, "studentName" => $student->getFirstname() . " " . $student->getLastname()],
            );
        }

        $html = $this->renderView("student/barcode.html.twig", [
            "barcodes" => $barcodes,
        ]);

        $pdfOptions = new Options();
        $pdfOptions->set("defaultFont", "Arial");

        $dompdf = new Dompdf($pdfOptions);
        $dompdf->loadHtml($html);

        $dompdf->setPaper("A4", "landscape");

        $dompdf->render();

        $output = $dompdf->output();

        return new Response($output, 200, [
            "Content-Type" => "application/pdf",
            "Content-Disposition" => "inline; filename=barcodes.pdf",
        ]);
    }
}
