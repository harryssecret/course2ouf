<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230104171558 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'removed shortname and level rows';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tbl_grade DROP shortname');
        $this->addSql('ALTER TABLE tbl_grade DROP level');
        $this->addSql('ALTER TABLE tbl_student ALTER time_goal DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE tbl_grade ADD shortname VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE tbl_grade ADD level INT NOT NULL');
        $this->addSql('ALTER TABLE tbl_student ALTER time_goal SET NOT NULL');
    }
}
