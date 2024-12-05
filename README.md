# Lancer dev

```
./build
./run
```

[localhost:8080](http://localhost:8080)

# Manuel d'utilisation


Pour créer une route, il suffit de faire un controller pour définir la route `src/Controller`. (ce serait bien de garder la logique de l'archi).

Le controller retourne l'html par un fichier twig `./templates`.

Les fichiers Twig permettent d'organiser et de structurer des templates en utilisant une hiérarchie où les fichiers peuvent s'encapsuler ou "hériter" les uns des autres.


# TODO
- Mettre à jour page admin gestion des admins et création d'un super admin et recherche d'utilisateur
- CI/CD gestion branche prod et dev et déploiement VPS prod-dev
- Quand un utilisateur est co mais n'a pas les droits nécessaires pour accéder à une page, une erreur s'affiche.