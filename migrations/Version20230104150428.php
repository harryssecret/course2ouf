<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230104150428 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ranking_grade (ranking_id INT NOT NULL, grade_id INT NOT NULL, PRIMARY KEY(ranking_id, grade_id))');
        $this->addSql('CREATE INDEX IDX_549EF98520F64684 ON ranking_grade (ranking_id)');
        $this->addSql('CREATE INDEX IDX_549EF985FE19A1A8 ON ranking_grade (grade_id)');
        $this->addSql('ALTER TABLE ranking_grade ADD CONSTRAINT FK_549EF98520F64684 FOREIGN KEY (ranking_id) REFERENCES tbl_ranking (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ranking_grade ADD CONSTRAINT FK_549EF985FE19A1A8 FOREIGN KEY (grade_id) REFERENCES tbl_grade (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE ranking_grade DROP CONSTRAINT FK_549EF98520F64684');
        $this->addSql('ALTER TABLE ranking_grade DROP CONSTRAINT FK_549EF985FE19A1A8');
        $this->addSql('DROP TABLE ranking_grade');
    }
}
