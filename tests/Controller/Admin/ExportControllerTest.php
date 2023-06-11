<?php

namespace App\Tests\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ExportControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/admin/export');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Exporter');

        $crawler->filter('a.btn')->first();
    }
}
