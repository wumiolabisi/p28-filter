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


# Evolutions possibles

**Créer et gérer des filtres directement dans la partie Admin** : 
* Créer un filtre attaché à un type de post (CPT ou non), ou de taxonomie (parmi celles qui existent).
* Ce filtre prendra en compte tous les filtrages possibles par rapport aux datas présentes dans ce post/taxo. L'utilisateur pourra décider d'utiliser ou non ces datas.
* Le filtre sera intégré sur une page template par un simple shortcode.