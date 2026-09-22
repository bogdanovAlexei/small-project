document.addEventListener("DOMContentLoaded",function(){
    const winDisplay = document.getElementById("victoireDisplay");
    const looseDisplay = document.getElementById('defaiteDisplay');
    const drawDisplay = document.getElementById('nulleDisplay');
    const robotDisplay = document.getElementById('robotDisplay');
    const resetButton = document.getElementById('resetButton');

    let compteurWin = 0;
    let compteurLoose = 0;
    let compteurDraw = 0;    

    const pierreButton = document.getElementById('pierreButton');
    const papierButton = document.getElementById('papierButton');
    const ciseauxButton = document.getElementById('ciseauxButton');
    
    let choix;

    pierreButton.addEventListener('click', function(){
        choix = 'Pierre';
        quiAGagne(choix, robot());
    })
    papierButton.addEventListener('click', function(){
        choix = 'Papier';
        quiAGagne(choix, robot());
    })
    ciseauxButton.addEventListener('click', function(){
        choix = 'Ciseaux';
        quiAGagne(choix, robot());
    })
    resetButton.addEventListener('click', function(){
        compteurLoose = 0;
        compteurDraw = 0;
        compteurWin = 0;
        drawDisplay.textContent = "Nulle : " + compteurDraw;
        winDisplay.textContent = "Victoire : " + compteurWin;
        looseDisplay.textContent = "Défaite : " + compteurLoose;
        robotDisplay.textContent = "Robot a joué : Pas encore";
    })

    const gagne = {
        "Pierre": "Ciseaux",
        "Ciseaux": "Papier",
        "Papier": "Pierre"
    };

    function robot(){
        let robotChoix = Math.floor(Math.random() * 3);
        const tableauChoix = ['Pierre', 'Papier', 'Ciseaux'];
        robotChoix = tableauChoix[robotChoix];
        robotDisplay.textContent = "Robot a joué : " + robotChoix;
        return robotChoix;
    }
  
    function quiAGagne( reponse1, reponse2){
        if(reponse1 === reponse2){
            compteurDraw++;
            drawDisplay.textContent = "Nulle : " + compteurDraw;
        }
        else if( gagne[reponse1] === reponse2){
            compteurWin++;
            winDisplay.textContent = "Victoire : " + compteurWin;
        }
        else {
            compteurLoose++;
            looseDisplay.textContent = "Défaite : " + compteurLoose; 
        }
    }
})