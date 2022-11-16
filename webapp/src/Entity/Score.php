<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: ScoreRepository::class)]
class Score
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $Classement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClassement(): ?int
    {
        return $this->Classement;
    }

    public function setClassement(int $Classement): self
    {
        $this->Classement = $Classement;

        return $this;
    }
}
