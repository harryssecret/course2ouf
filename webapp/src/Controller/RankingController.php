<?php

namespace App\Controller;

use App\Entity\Ranking;
use App\Form\RankingType;
use App\Repository\RankingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/ranking')]
class RankingController extends AbstractController
{
    #[Route('/', name: 'app_ranking_index', methods: ['GET'])]
    public function index(RankingRepository $rankingRepository): Response
    {
        return $this->render('ranking/index.html.twig', [
            'rankings' => $rankingRepository->findAll(),
        ]);
    }

    #[Route('/rankBy={rankType}', name: 'app_ranking_rank_by', methods: ['GET'])]
    public function rankBy(RankingRepository $rankingRepository, string $rankType): Response
    {
        $sortedRankings = match ($rankType) {
            'vitesse' => $rankingRepository->getFastestRunners(),
            'lent'  => $rankingRepository->getWorstRunners(),
            'men'  => $rankingRepository->getMenRunners(),
        };

        return $this->render('ranking/index.html.twig', [
            'rankings' => $sortedRankings,
            
        ]);
    }

    #[Route('/new', name: 'app_ranking_new', methods: ['GET', 'POST'])]
    public function new(Request $request, RankingRepository $rankingRepository): Response
    {
        $ranking = new Ranking();
        $form = $this->createForm(RankingType::class, $ranking);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $rankingRepository->save($ranking, true);

            return $this->redirectToRoute('app_ranking_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('ranking/new.html.twig', [
            'ranking' => $ranking,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_ranking_show', methods: ['GET'])]
    public function show(Ranking $ranking): Response
    {
        return $this->render('ranking/show.html.twig', [
            'ranking' => $ranking,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_ranking_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Ranking $ranking, RankingRepository $rankingRepository): Response
    {
        $form = $this->createForm(RankingType::class, $ranking);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $rankingRepository->save($ranking, true);

            return $this->redirectToRoute('app_ranking_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('ranking/edit.html.twig', [
            'ranking' => $ranking,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_ranking_delete', methods: ['POST'])]
    public function delete(Request $request, Ranking $ranking, RankingRepository $rankingRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$ranking->getId(), $request->request->get('_token'))) {
            $rankingRepository->remove($ranking, true);
        }

        return $this->redirectToRoute('app_ranking_index', [], Response::HTTP_SEE_OTHER);
    }
}
