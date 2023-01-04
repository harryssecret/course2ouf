<?php

namespace App\Test\Controller;

use App\Entity\Ranking;
use App\Repository\RankingRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RankingControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private RankingRepository $repository;
    private string $path = '/ranking/';

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->repository = static::getContainer()->get('doctrine')->getRepository(Ranking::class);

        foreach ($this->repository->findAll() as $object) {
            $this->repository->remove($object, true);
        }
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Ranking index');

        // Use the $crawler to perform additional assertions e.g.
        // self::assertSame('Some text on the page', $crawler->filter('.p')->first());
    }

    public function testNew(): void
    {
        $originalNumObjectsInRepository = count($this->repository->findAll());

        $this->markTestIncomplete();
        $this->client->request('GET', sprintf('%snew', $this->path));

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'ranking[endrun]' => 'Testing',
            'ranking[Race]' => 'Testing',
            'ranking[Student]' => 'Testing',
        ]);

        self::assertResponseRedirects('/ranking/');

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new Ranking();
        $fixture->setEndrun('My Title');
        $fixture->setRace('My Title');
        $fixture->setStudent('My Title');

        $this->repository->save($fixture, true);

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Ranking');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new Ranking();
        $fixture->setEndrun('My Title');
        $fixture->setRace('My Title');
        $fixture->setStudent('My Title');

        $this->repository->save($fixture, true);

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'ranking[endrun]' => 'Something New',
            'ranking[Race]' => 'Something New',
            'ranking[Student]' => 'Something New',
        ]);

        self::assertResponseRedirects('/ranking/');

        $fixture = $this->repository->findAll();

        self::assertSame('Something New', $fixture[0]->getEndrun());
        self::assertSame('Something New', $fixture[0]->getRace());
        self::assertSame('Something New', $fixture[0]->getStudent());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();

        $originalNumObjectsInRepository = count($this->repository->findAll());

        $fixture = new Ranking();
        $fixture->setEndrun('My Title');
        $fixture->setRace('My Title');
        $fixture->setStudent('My Title');

        $this->repository->save($fixture, true);

        self::assertSame($originalNumObjectsInRepository + 1, count($this->repository->findAll()));

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertSame($originalNumObjectsInRepository, count($this->repository->findAll()));
        self::assertResponseRedirects('/ranking/');
    }
}
