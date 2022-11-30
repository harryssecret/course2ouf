<?php

namespace App\Entity;

use App\Repository\RankingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RankingRepository::class)]
class Ranking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $endrun = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEndrun(): ?\DateTimeInterface
    {
        return $this->endrun;
    }

    public function setEndrun(\DateTimeInterface $endrun): self
    {
        $this->endrun = $endrun;

        return $this;
    }
}
