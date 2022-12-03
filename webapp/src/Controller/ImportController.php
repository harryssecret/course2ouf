<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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

    #[Route('/import', name: 'app_send_import', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $studentArray = [];

        return $this->render('import/new.html.twig', []);
    }
}
