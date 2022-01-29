/* Gestion des évenements */

/* reprise d'éléments issue du projet ToDoList*/

function mobileCheck() {
    // Renvoie true quand l'utilisateur est sur Mobile.
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function addCrossPlatformClickListener(element,fonction){
    // Permet d'ajouter soit touchstart soit click sur un élement donné en fonction de la plateforme utilisée.
    // On utilise une fonction anonyme pour pouvoir appeller des méthodes en plus des fonctions.

    if(mobilecheck()){ //-Mobile
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