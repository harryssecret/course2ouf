<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RankingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Table(name: "tbl_ranking")]
#[ORM\Entity(repositoryClass: RankingRepository::class)]
class Ranking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $endrun = null;

    #[ORM\ManyToOne(inversedBy: 'rankings')]
    private ?Race $Race = null;

    #[ORM\ManyToOne(inversedBy: 'rankings')]
    private ?Student $Student = null;

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

    public function getRace(): ?Race
    {
        return $this->Race;
    }

    public function setRace(?Race $Race): self
    {
        $this->Race = $Race;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->Student;
    }

    public function setStudent(?Student $Student): self
    {
        $this->Student = $Student;

        return $this;
    }
}
