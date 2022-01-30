/* Gestion des valeurs */

function getInput(element){
    // Renvoie la valeur inscrite dans l'input si elle est valide ie. c'est un nombre positif.
}

/* Gestion de l'affichage */

function selectPage(pagename){
    // Place la page dont le nom est donné en argument à l'avant (z-index = 2;),
    // Passe l'opacité des autres boutons de pages à 50%
    // Return 1; et est ignorée quand on n'est pas sur mobile (mobileCheck()==false)
}

/* Gestion de l'API */

function getExchangeRates(date = t){
    // Renvoie un tableau contenant les taux d'échanges obtenus via l'API
    // Enregistre les taux d'échanges dans localStorage avec la date comme id
}

/* Utilitaires */

function getDate(separator = '-'){
    // Renvoie la date actuelle, prend un type de séparateur en argument optionel, par défault '-'.
    if(typeof(separator)==string){
        return today.getFullYear()+separator+(today.getMonth()+1)+separator+today.getDate();
    }
    else{
        return "Wrong type of separator given as an argument in getDate, should be a string"
    }
}

/* reprise d'éléments issue du projet ToDoList*/

function mobileCheck() {
    // Renvoie true quand l'utilisateur est sur Mobile.
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function addCrossPlatformClickListener(element,fonction){
    // Permet d'ajouter soit touchstart soit click sur un élement donné en fonction de la plateforme utilisée.
    // On utilise une fonction anonyme pour pouvoir appeller des méthodes en plus des fonctions.
    if(mobileCheck()){ //-Mobile
    element.addEventListener('touchstart',() => fonction);
    }
    else{
    element.addEventListener('click',() => fonction);
    }
};

function addGlobalEnterListener(fonction){
    // Associe une fonction donnée à l'évenement enter pour tout le document
    document.addEventListener('keydown', logKey);
    function logKey(e) {
        if(e.key == 'Enter'){
            fonction();
            return 0;
        }
    }
};