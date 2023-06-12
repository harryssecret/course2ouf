<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Controller\Api\GetStudentByBarcodeController;
use App\Repository\StudentRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Uid\Ulid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
)]
#[ORM\Table(name: "tbl_student")]
#[ORM\Entity(repositoryClass: StudentRepository::class)]
class Student
{
    const GENDER_MALE = "Homme";
    const GENDER_FEMALE = "Femme";

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
    private ?\DateTimeInterface $timeGoal = null;

    #[Ignore()]
    #[ORM\ManyToOne(inversedBy: "students")]
    private ?Grade $grade = null;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: "Student", targetEntity: Ranking::class)]
    private ?Collection $rankings = null;

    #[ORM\Column(type: 'ulid', nullable: true)]

    private ?Ulid $barcodeId = null;

    public function __construct()
    {
        $this->rankings = new ArrayCollection();
        $this->barcodeId = new Ulid();
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
        return $this->timeGoal;
    }

    public function setTimeGoal(\DateTimeInterface $timeGoal): self
    {
        $this->timeGoal = $timeGoal;

        return $this;
    }

    public function getGrade(): ?Grade
    {
        return $this->grade;
    }

    public function setGrade(?Grade $grade): self
    {

        $this->grade = $grade;

        return $this;
    }

    public function setGender(string $gender): self
    {
        if (!in_array($gender, array(self::GENDER_FEMALE, self::GENDER_MALE))) {
            throw new \InvalidArgumentException("Invalid gender");
        }
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
