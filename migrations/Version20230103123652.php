<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230103123652 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE export_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE export (id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, path TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN export.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE tbl_student ALTER time_goal SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE export_id_seq CASCADE');
        $this->addSql('DROP TABLE export');
        $this->addSql('ALTER TABLE tbl_grade DROP level');
        $this->addSql('ALTER TABLE tbl_grade RENAME COLUMN shortname TO gradename');
        $this->addSql('ALTER TABLE tbl_student ALTER time_goal DROP NOT NULL');
    }
}
