<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(): never
    {
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}
