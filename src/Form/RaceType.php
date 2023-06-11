<?php

namespace App\Form;

use App\Entity\Race;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RaceType extends AbstractType
{
    public function buildForm(
        FormBuilderInterface $builder,
        array $options
    ): void {
        $builder->add("start")->add("status", ChoiceType::class, [
            'choices' => [
                "En attente" => Race::STATUS_RACE_NOT_STARTED,
                "En cours" => Race::STATUS_RACE_STARTED,
                "Terminée" => Race::STATUS_RACE_FINISHED
            ]
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            "data_class" => Race::class,
        ]);
    }
}
