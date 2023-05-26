<?php

namespace App\Entity;

use App\Repository\GradeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table(name: "tbl_grade")]
#[ORM\Entity(repositoryClass: GradeRepository::class)]
class Grade
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(mappedBy: "Grade", targetEntity: Student::class)]
    private Collection $students;

    #[ORM\Column(length: 255)]
    private ?string $gradeName = null;

    #[ORM\ManyToMany(targetEntity: Ranking::class, mappedBy: 'Grade')]
    private Collection $rankings;

    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->rankings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Student>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students->add($student);
            $student->setGrade($this);
        }

        return $this;
    }

    public function removeStudent(Student $student): self
    {
        if ($this->students->removeElement($student)) {
            // set the owning side to null (unless already changed)
            if ($student->getGrade() === $this) {
                $student->setGrade(null);
            }
        }

        return $this;
    }

    public function getgradename(): ?string
    {
        return $this->gradeName;
    }

    public function setgradename(string $gradeName): self
    {
        $this->gradeName = $gradeName;

        return $this;
    }

    public function __toString()
    {
        return $this->gradeName;
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
        }

        return $this;
    }

    public function removeRanking(Ranking $ranking): self
    {
        $this->rankings->removeElement($ranking);

        return $this;
    }
}
