<?php

namespace App\DataFixtures;

use App\Entity\Referee;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RefereeHasherProvider
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function hashPassword(string $plainPassword): string
    {
        return $this->passwordHasher->hashPassword(new Referee(), $plainPassword);
    }
}
