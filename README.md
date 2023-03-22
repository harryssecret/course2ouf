# course2ouf - une application pour gérer vos cross

course2ouf est une application qui permet de simplifier l'organisation des cross organisés par les établissements scolaires. Il se base sur les librairies Symfony,

Vous pouvez retrouver l'intégralité des documents utilisés pour la réalisation de ce projet pour notre BTS à [cette adresse](https://cloud.ndlaprovidence.org/index.php/apps/files/?dir=/Documents/SIO2/ProjetNum2Sio&fileid=145720).

## Table des matières

- [course2ouf - une application pour gérer vos cross](#course2ouf---une-application-pour-gérer-vos-cross)
  - [Table des matières](#table-des-matières)
  - [Installation](#installation)
    - [Installation avec Docker](#installation-avec-docker)
    - [Installation manuelle](#installation-manuelle)
  - [Licence](#licence)

## Installation

Il existe deux moyens d'héberger l'application Symfony, vous pouvez soit le faire traditionnellement, soit utiliser Docker. Docker est celle que nous recommandons, car il n'y a pas besoin de se prendre la tête avec les dépendances etc.

### Installation avec Docker

Assurez vous d'avoir Docker et un minimum de stockage disponible afin de construire l'image. La compatibilité avec les sytèmes x86_64 est la seule étant fonctionelle à ce que je sache. Il faut commencer par cloner le projet, construire l'image, puis lancer les autres services grâce à `docker compose`.

```bash
cd webapp/
docker compose build --no-cache --pull
docker compose up -d
```


### Installation manuelle

Cette section est en cours de création. Merci de revenir plus tard!

Il faudra aussi vous renseigner sur les variables d'environment afin de faire fonctionner cette application. Vous pourrez générer la clé JWT en effectuant `php bin/console lexik:jwt:generate-keypair`

Si vous utilisez Windows, il peut être nécessaire d'avoir à installer OpenSSL. Je vous conseille d'installer Scoop, et OpenSSL ensuite.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
irm get.scoop.sh | iex
scoop install openssl
```

## Licence

Ce projet est sous licence GPLv3. Nous ne garantissons pas le fonctionnement de ce logiciel, et nous nous dédouanons des problèmes causés par notre logiciel.
