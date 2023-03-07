<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Referee;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiAuthTest extends ApiTestCase
{
    use RefreshDatabaseTrait;


    private $entityManager;
    public function testAuth(UserPasswordHasherInterface $us): void
    {
        $client = static::createClient();
        $kernel = static::bootKernel();
        $container = $kernel->getContainer();

        $referee = new Referee();
        $referee->setUsername("admin");
        $referee->setPassword($us->hashPassword($referee, "admin"));

        $entityManager = $kernel->getContainer()->get('doctrine')->getManager();

        $entityManager->persist($referee);
        $entityManager->flush($referee);

        $response = $client->request('POST', '/api/auth');
    }
}
