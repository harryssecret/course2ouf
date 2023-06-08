<?php

namespace App\Tests\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GradeControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/admin/grade');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Grade index');
    }
}
