<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221130144223 extends AbstractMigration
{
    public function getDescription(): string
    {
        return "";
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE tbl_ranking ADD race_id INT DEFAULT NULL");
        $this->addSql(
            "ALTER TABLE tbl_ranking ADD student_id INT DEFAULT NULL"
        );
        $this->addSql(
            "ALTER TABLE tbl_ranking ADD CONSTRAINT FK_DBEB31A46E59D40D FOREIGN KEY (race_id) REFERENCES tbl_race (id) NOT DEFERRABLE INITIALLY IMMEDIATE"
        );
        $this->addSql(
            "ALTER TABLE tbl_ranking ADD CONSTRAINT FK_DBEB31A4CB944F1A FOREIGN KEY (student_id) REFERENCES tbl_student (id) NOT DEFERRABLE INITIALLY IMMEDIATE"
        );
        $this->addSql(
            "CREATE INDEX IDX_DBEB31A46E59D40D ON tbl_ranking (race_id)"
        );
        $this->addSql(
            "CREATE INDEX IDX_DBEB31A4CB944F1A ON tbl_ranking (student_id)"
        );
        $this->addSql("ALTER TABLE tbl_student ADD grade_id INT DEFAULT NULL");
        $this->addSql(
            "ALTER TABLE tbl_student ADD CONSTRAINT FK_EC70A747FE19A1A8 FOREIGN KEY (grade_id) REFERENCES tbl_grade (id) NOT DEFERRABLE INITIALLY IMMEDIATE"
        );
        $this->addSql(
            "CREATE INDEX IDX_EC70A747FE19A1A8 ON tbl_student (grade_id)"
        );
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE SCHEMA public");
        $this->addSql(
            "ALTER TABLE tbl_ranking DROP CONSTRAINT FK_DBEB31A46E59D40D"
        );
        $this->addSql(
            "ALTER TABLE tbl_ranking DROP CONSTRAINT FK_DBEB31A4CB944F1A"
        );
        $this->addSql("DROP INDEX IDX_DBEB31A46E59D40D");
        $this->addSql("DROP INDEX IDX_DBEB31A4CB944F1A");
        $this->addSql("ALTER TABLE tbl_ranking DROP race_id");
        $this->addSql("ALTER TABLE tbl_ranking DROP student_id");
        $this->addSql(
            "ALTER TABLE tbl_student DROP CONSTRAINT FK_EC70A747FE19A1A8"
        );
        $this->addSql("DROP INDEX IDX_EC70A747FE19A1A8");
        $this->addSql("ALTER TABLE tbl_student DROP grade_id");
    }
}
