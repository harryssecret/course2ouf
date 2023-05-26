<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221204121650 extends AbstractMigration
{
    public function getDescription(): string
    {
        return "Changed boolean gender to enum (counted as str by doctrine)";
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("DROP SEQUENCE messenger_messages_id_seq CASCADE");
        $this->addSql(
            "CREATE SEQUENCE import_id_seq INCREMENT BY 1 MINVALUE 1 START 1"
        );
        $this->addSql(
            "CREATE SEQUENCE referee_id_seq INCREMENT BY 1 MINVALUE 1 START 1"
        );
        $this->addSql(
            "CREATE TABLE import (id INT NOT NULL, file_path TEXT NOT NULL, uploaded_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))"
        );
        $this->addSql(
            'COMMENT ON COLUMN import.uploaded_at IS \'(DC2Type:datetime_immutable)\''
        );
        $this->addSql(
            "CREATE TABLE referee (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))"
        );
        $this->addSql(
            "CREATE UNIQUE INDEX UNIQ_D60FB342F85E0677 ON referee (username)"
        );
        $this->addSql("DROP TABLE messenger_messages");
        $this->addSql("ALTER TABLE tbl_student ALTER gender TYPE VARCHAR(255)");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE SCHEMA public");
        $this->addSql("DROP SEQUENCE import_id_seq CASCADE");
        $this->addSql("DROP SEQUENCE referee_id_seq CASCADE");
        $this->addSql(
            "CREATE SEQUENCE messenger_messages_id_seq INCREMENT BY 1 MINVALUE 1 START 1"
        );
        $this->addSql(
            "CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))"
        );
        $this->addSql(
            "CREATE INDEX idx_75ea56e016ba31db ON messenger_messages (delivered_at)"
        );
        $this->addSql(
            "CREATE INDEX idx_75ea56e0e3bd61ce ON messenger_messages (available_at)"
        );
        $this->addSql(
            "CREATE INDEX idx_75ea56e0fb7336f0 ON messenger_messages (queue_name)"
        );
        $this->addSql("DROP TABLE import");
        $this->addSql("DROP TABLE referee");
        $this->addSql("ALTER TABLE tbl_student ALTER gender TYPE BOOLEAN");
    }
}
