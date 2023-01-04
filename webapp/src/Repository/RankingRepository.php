<?php

namespace App\Repository;

use App\Entity\Ranking;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ranking>
 *
 * @method Ranking|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ranking|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ranking[]    findAll()
 * @method Ranking[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RankingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ranking::class);
    }

    public function save(Ranking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Ranking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getFastestRunners(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->orderBy('r.endrun', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function getWorstRunners(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->orderBy('r.endrun', 'DESC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function getMenRunners(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->innerJoin('App\Entity\Student', 's', 'WITH', 'r.Student = s.id')
            ->where('s.gender = :Student')
            ->setParameter('Student', 'Homme')
            ->orderBy('r.endrun', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function getWomenRunners(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->innerJoin('App\Entity\Student', 's', 'WITH', 'r.Student = s.id')
            ->where('s.gender = :Student')
            ->setParameter('Student', 'Femme')
            ->orderBy('r.endrun', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function getGradeRunners(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->innerJoin('App\Entity\Grade', 'g', 'WITH', 'r.Grade = g.id')
            ->where('g.gradename = :Grade')
            ->setParameter('Grade','gradename')
            ->orderBy('r.endrun', 'ASC')
            ->getQuery()
            ->getResult();
    }


    //    /**
    //     * @return Ranking[] Returns an array of Ranking objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('r.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Ranking
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
