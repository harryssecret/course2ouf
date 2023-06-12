<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Referee;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

abstract class AbstractApiTest extends ApiTestCase
{
    use RefreshDatabaseTrait;
    private $entityManager;
    private ?string $apiToken = null;

    public function setUp(): void
    {
        self::bootKernel();
    }

    protected function createClientWithCredentials($token = null): Client
    {
        $this->apiToken = $token ?: $this->getToken();

        return static::createClient([], ['headers' => ['authorization' => 'Bearer '.$token]]);
    }

    protected function getToken($body = []): string
    {
        if ($this->apiToken) {
            return $this->apiToken;
        }

        $response = static::createClient()->request('POST', '/api/auth', ['json' => $body ?: [
            'username' => 'admin',
            'password' => 'admin',
        ]]);

        $this->assertResponseIsSuccessful();
        $data = $response->toArray();
        $this->token = $data['token'];

        return $data['token'];
    }
}
