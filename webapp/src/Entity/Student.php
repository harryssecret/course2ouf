<?php

namespace App\Entity;

use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Ulid;

#[ORM\Table(name: "tbl_student")]
#[ORM\Entity(repositoryClass: StudentRepository::class)]
class Student
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $gender = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $TimeGoal = null;

    #[ORM\ManyToOne(inversedBy: "students")]
    private ?Grade $Grade = null;

    #[ORM\OneToMany(mappedBy: "Student", targetEntity: Ranking::class)]
    private ?Collection $rankings = null;

    #[ORM\Column(type: 'ulid', nullable: true)]
    private ?Ulid $barcodeId = null;

    public function __construct()
    {
        $this->rankings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = ucfirst($firstname);

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = ucfirst($lastname);

        return $this;
    }

    public function getTimeGoal(): ?\DateTimeInterface
    {
        return $this->TimeGoal;
    }

    public function setTimeGoal(\DateTimeInterface $TimeGoal): self
    {
        $this->TimeGoal = $TimeGoal;

        return $this;
    }

    public function getGrade(): ?Grade
    {
        return $this->Grade;
    }

    public function setGrade(?Grade $Grade): self
    {
        $this->Grade = $Grade;

        return $this;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getGender(): string
    {
        return $this->gender;
    }

    /**
     * @return Collection<int, Ranking>
     */
    public function getRankings(): Collection
    {
        return $this->rankings;
    }

    public function addRanking(Ranking $ranking): self
    {
        if (!$this->rankings->contains($ranking)) {
            $this->rankings->add($ranking);
            $ranking->setStudent($this);
        }

        return $this;
    }

    public function removeRanking(Ranking $ranking): self
    {
        if ($this->rankings->removeElement($ranking)) {
            // set the owning side to null (unless already changed)
            if ($ranking->getStudent() === $this) {
                $ranking->setStudent(null);
            }
        }

        return $this;
    }

    public function getBarcodeId(): ?Ulid
    {
        return $this->barcodeId;
    }

    public function setBarcodeId(?Ulid $barcodeId): self
    {
        $this->barcodeId = $barcodeId;

        return $this;
    }

    public function __toString()
    {
        return $this->firstname . " " . $this->lastname;
    }
}
