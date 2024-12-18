# Quoi ?
Un système de filtrage AJAX de posts ou de custom posts, de taxonomies.

# Comment marche ce plugin ?
Via Appel Ajax, lorsqu'on est sur la page des archives (shortcode).


# Structure du projet
## Architecture 
Une arborescence basée sur le Boilerplate de Devin Vinson (https://github.com/DevinVinson/WordPress-Plugin-Boilerplate/tree/master), pour permettre l'évolution éventuelle du projet.
```
p28-filter/
│
├── assets/                                 # Source code
│   ├── scss/                               # 
│   │   └── style.scss                      # 
│   └── js/                                 #
│       └── index.js                        # 
│
├── build/                                  # Optimized code for the build
│   ├── css/                                # 
│   │   ├── main.min.css                    # 
│   │   └── main.min.css.map                #
│   │                                       # 
│   └── js/                                 #
│       └── main.min.js                     # 
│
├── includes/                               # functionality shared between the admin area and the public-facing parts of the site reside
│   ├── class-p28-filter-activator.php      # 
│   ├── class-p28-filter-deactivator.php    # 
│   ├── class-p28-filter-i18n.php           # 
│   ├── class-p28-filter-loader.php         # 
│   ├── class-p28-filter.php                # 
│   └── index.php                           # 
│
├── languages/                              # Dossier pour les fichiers de traduction
│   └── p28-filter.pot                      # 
│
├── templates/                              # PHP templates
│
├── .gitignore                              # 
├── CHANGELOG.md                            # The list of changes to the core project
├── index.php                               # 
├── LICENCE                                 # 
├── p28-filter.php                          # Principal file
├── package.json                            # 
├── README.md                               # Fichier que vous êtes entrain de lire
├── uninstall.php                           # 
└── webpack.config.js                       # Webpack config  
```
## Branches
* main : la branche la plus à jour
* release-MM-YYYY : le ZIP du plugin (à télécharger pour l'installer sur son WP), MM est le mois et YYYY est l'année de la release
* feature-X : développement de la feature X
* hotfix-X : correction du bug X 
### Workflow
* feature-logicAPI : Développement de la logique du système pour l'archive Oeuvre + mise en page du filtrage
* feature-compatibilityAllNativeArchives : Rendre compatible le système sur toutes les pages d'archives native à WordPress
* feature-intergrationV1 : Merge des deux fonctionnalités précédentes logicApi + compatibility
```
main ──┬───────────────────────────────────────────────────────────────────────────┬─
       │                                                                           │ 
       ├── feature-logicApi ──> feature-compatibility ──> feature-integrationV1  ──├
      
```

# Développement
## Installation du projet
Reprendre la branche main, la branche la plus à jour
```
git clone https://github.com/wumiolabisi/p28-filter.git
```
Pour installer le projet :
```
npm install
```

Pour lancer le projet avec chargement des modifs js/scss en continue : 
```
npm run watch
```

Pour lancer un build :
```
npm run build
```
# Installation sur Wordress
1. Téléchargez l’archive ZIP du plugin depuis GitHub Releases.
2. Rendez-vous sur votre tableau de bord WordPress : Extensions > Ajouter.
3. Cliquez sur Téléverser une extension et sélectionnez l’archive ZIP.
4. Activez le plugin après l'installation.

## Utilisation
* Ajoutez le shortcode suivant dans votre contenu ou votre page :
` 
[p28_filter]
`
⚠️ Important : Le plugin gère l’affichage des contenus filtrés. Assurez-vous qu'il n’y ait pas de boucle WordPress dans le modèle utilisé par cette page.

# Problématiques rencontrées
## Semaine du 25 novembre : 
   * L'utilisation des champs ACF a complexifié la récupération des posts, notamment car l'API REST fonctionne avec des IDs (donc des types int) et les valeurs numériques de champs ACF sont enregistrées en BDD en longtext. Nativement, il n'y a pas la possibilité de forcer un type de variable.
   * La récupération des posts d'une archive en filtrant sur les champs ACF n'est pas nativement possible : il a fallu que je modifie la requête avec rest_{$post_type}_query. C'était très peu documenté, beaucoup de lecture à faire pour s'assurer que ce n'était pas possible. 

# Améliorations prévues
* Message ou animation de chargement plus sympa
* Compatibilité sur toute les pages d'archives

# Evolutions possibles

**Créer et gérer des filtres directement dans la partie Admin** : 
* Créer un filtre attaché à un type de post (CPT ou non), ou de taxonomie (parmi celles qui existent).
* Ce filtre prendra en compte tous les filtrages possibles par rapport aux datas présentes dans ce post/taxo. L'utilisateur pourra décider d'utiliser ou non ces datas.
* Le filtre sera intégré sur une page template par un simple shortcode.