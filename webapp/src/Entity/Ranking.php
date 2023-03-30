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
    private ?\DateTimeInterface $endrun = null;

    #[ORM\ManyToOne(inversedBy: "rankings")]
    private ?Race $Race = null;

    #[Groups(['read', 'write'])]
    #[ORM\ManyToOne(inversedBy: "rankings")]
    private ?Student $Student = null;

    #[Ignore()]
    #[ORM\ManyToMany(targetEntity: Grade::class, inversedBy: 'rankings')]
    private Collection $Grade;

    public function __construct()
    {
        $this->Grade = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Grade>
     */
    public function getGrade(): Collection
    {
        return $this->Grade;
    }

    public function addGrade(Grade $grade): self
    {
        if (!$this->Grade->contains($grade)) {
            $this->Grade->add($grade);
        }

        return $this;
    }

    public function removeGrade(Grade $grade): self
    {
        $this->Grade->removeElement($grade);

        return $this;
    }
}
