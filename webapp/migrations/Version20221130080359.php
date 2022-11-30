<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221130080359 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE classe_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE course_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE eleve_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE score_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE grade_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE race_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE ranking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE student_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE grade (id INT NOT NULL, shortname VARCHAR(255) NOT NULL, level INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE race (id INT NOT NULL, start DATE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE ranking (id INT NOT NULL, endrun TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE student (id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, gender BOOLEAN NOT NULL, mas INT NOT NULL, objectiv TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE score');
        $this->addSql('DROP TABLE eleve');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE classe');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE grade_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE race_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE ranking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE student_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE classe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE course_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE eleve_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE score_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE score (id INT NOT NULL, classement INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE eleve (id INT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, sexe VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE course (id INT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE classe (id INT NOT NULL, nom VARCHAR(255) NOT NULL, numero INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE grade');
        $this->addSql('DROP TABLE race');
        $this->addSql('DROP TABLE ranking');
        $this->addSql('DROP TABLE student');
    }
}
