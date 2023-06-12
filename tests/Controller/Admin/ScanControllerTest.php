<?php

namespace App\Tests\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ScanControllerTest extends WebTestCase
{

    public function testAdminAuth(): void
    {

    }

    public function testSomething(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/admin/scan');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Scan');
    }
}
