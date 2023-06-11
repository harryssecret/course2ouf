<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RankingRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ApiResource]
#[ORM\Table(name: "tbl_ranking")]
#[ORM\Entity(repositoryClass: RankingRepository::class)]
class Ranking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Context([DateTimeNormalizer::FORMAT_KEY => 'H:i:s'])]
    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $endRun = null;

    #[ORM\ManyToOne(inversedBy: "rankings")]
    private ?Race $race = null;

    #[Groups(['read', 'write'])]
    #[ORM\ManyToOne(inversedBy: "rankings")]
    private ?Student $student = null;


    public function __construct()
    {
        $this->Grade = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEndRun(): ?\DateTimeInterface
    {
        return $this->endRun;
    }

    public function setEndRun(\DateTimeInterface $endRun): self
    {
        $this->endRun = $endRun;

        return $this;
    }

    public function getRace(): ?Race
    {
        return $this->race;
    }

    public function setRace(?Race $race): self
    {
        $this->race = $race;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): self
    {
        $this->student = $student;

        return $this;
    }

}
