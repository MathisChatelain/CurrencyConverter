async function manageInput(){
    let input = Number(document.getElementById("moneyInput").value);
    
    if(input.length == 0){
        input = 0;
    }
    
    const  response = await fetch("https://openexchangerates.org/api/latest.json?app_id=5a491e83ebbb42518348231cd8776b1a");
    const jsonOpenExchange = await response.json();
    const exchangeRates = jsonOpenExchange.rates;
    console.log(exchangeRates);

    let orderOfConversion = ['USD','EUR','GBP','CHF','CNY','KRW','BTC','MXN','AED','MYR','THB']

    let UL = document.getElementById("mainUL");
    UL.innerHTML = ""; // Reset UL

    for(index in orderOfConversion){
        let abbreviation = orderOfConversion[index];
        let finalValue = Number(exchangeRates[abbreviation])*input;
        var LI = document.createElement('li');
        LI.innerText = finalValue.toString() +" "+ abbreviation + ' (' + exchangeRates[abbreviation].toString() + ')';
        UL.appendChild(LI);
    }
}

function selectPage(pagename){
    // Place la page dont le nom est donné en argument à l'avant (z-index = 3;),
    // Passe l'opacité des autres boutons de pages à 50%
    // Return 1; et est ignorée quand on n'est pas sur mobile (mobileCheck()==false)
    if (screen.width < 450){
        let classic = document.getElementById('classic');
        let crypto = document.getElementById('crypto');
        let memory = document.getElementById('memory');
        let classicButton = document.getElementById('classicButton');
        let cryptoButton = document.getElementById('cryptoButton');
        let memoryButton = document.getElementById('memoryButton');

        switch (pagename) {

            case 'classic':  
                classic.style.zIndex = "3";
                crypto.style.zIndex = "2";
                memory.style.zIndex = "1";
                
                classicButton.style.opacity = "100%";
                cryptoButton.style.opacity = "20%";
                memoryButton.style.opacity = "20%";
                break;

            case 'crypto':
                classic.style.zIndex = "2";
                crypto.style.zIndex = "3";
                memory.style.zIndex = "1";
                
                classicButton.style.opacity = "20%";
                cryptoButton.style.opacity = "100%";
                memoryButton.style.opacity = "20%";
                break;

            case 'memory':
                classic.style.zIndex = "2";
                crypto.style.zIndex = "1";
                memory.style.zIndex = "3";
                
                classicButton.style.opacity = "20%";
                cryptoButton.style.opacity = "20%";
                memoryButton.style.opacity = "100%";
                break;
        }
        return 0; 
    }   
    else{
        return 1;
    }   
}

async function setExchangeRates(){
    // Déclare, dans localStorage un dictionnaire 'exchangeRates' contenant les taux d'échanges (basés sur le dollar) obtenus via l'API
    const  response = await fetch("https://openexchangerates.org/api/latest.json?app_id=5a491e83ebbb42518348231cd8776b1a");
    const jsonOpenExchange = await response.json();
    const exchangeRates = jsonOpenExchange.rates;
    const date = getDate();
    // Enregistre les taux d'échanges dans localStorage avec la date comme id
    localStorage.setItem(date,exchangeRates);
    return exchangeRates;
}

function getDate(separator = '-'){
    // Renvoie la date actuelle, prend un type de séparateur en argument optionel, par défault '-'.
    let today = new Date();
    if(typeof(separator)=="string"){
        return today.getFullYear()+separator+(today.getMonth()+1)+separator+today.getDate();
    }
    else{
        return "Wrong type of separator given as an argument in getDate, should be a string";
    }
}

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

// Chargement de la page 
setExchangeRates();

// Initialisation à 1 dollar américain 
document.getElementById("moneyInput").value = 1;
manageInput();

// Appelle manageInput en appuyant sur entrer
addGlobalEnterListener(manageInput)
// document.getElementById("moneyInput").addEventListener('change',manageInput);

let classicButton = document.getElementById('classicButton');
classicButton.addEventListener('click',() => selectPage('classic'));
classicButton.addEventListener('touchstart',() => selectPage('classic'));

let cryptoButton = document.getElementById('cryptoButton');
cryptoButton.addEventListener('click',() => selectPage('crypto'));
cryptoButton.addEventListener('touchstart',() => selectPage('crypto'));

let memoryButton = document.getElementById('memoryButton');
memoryButton.addEventListener('click',() => selectPage('memory'));
memoryButton.addEventListener('touchstart',() => selectPage('memory'));