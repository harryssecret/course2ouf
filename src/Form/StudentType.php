<?php

namespace App\Form;

use App\Entity\Student;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class StudentType extends AbstractType
{
    public function buildForm(
        FormBuilderInterface $builder,
        array $options
    ): void {
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('gender', ChoiceType::class, [
                'choices' => [
                    'Homme' => "Homme",
                    'Femme' => 'Femme'
                ]
            ])
            ->add('Grade');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            "data_class" => Student::class,
        ]);
    }
}
