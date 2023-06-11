<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScanController extends AbstractController
{
    #[Route('/admin/scan', name: 'app_scan')]
    public function index(): Response
    {
        return $this->render('scan/index.html.twig', [
            'controller_name' => 'ScanController',
        ]);
    }
}
