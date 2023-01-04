<?php

namespace App\Form;

use App\Entity\Import;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class ImportFormType extends AbstractType
{
    public function buildForm(
        FormBuilderInterface $builder,
        array $options
    ): void {
        $builder->add("csvFile", FileType::class, [
            "label" => "Export (format CSV)",
            "mapped" => false,
            "required" => false,
            "constraints" => [
                new File([
                    "mimeTypes" => ["text/csv", "text/plain"],
                    "mimeTypesMessage" =>
                        "Envoyez un fichier au format valide.",
                ]),
            ],
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            "data_class" => Import::class,
        ]);
    }
}
