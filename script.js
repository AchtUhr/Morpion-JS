let tour_O;
const X = "X";
const O = "O";
const cellules = document.querySelectorAll(".cellule");
const boutonRejouer = document.getElementById("boutonRejouer");
const message = document.getElementById("message");
const elementRejouer = document.querySelector(".rejouer");
const combinaisons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

start();

function start() {
    tour_O = false;
    cellules.forEach(cellule => {
        cellule.addEventListener('click', gestionClick, { once: true });
    });
}

function gestionClick(e) {
    messageJoueur(true);
    messageJoueur(false);
    const cellule = e.target;
    let aQuiLeTour = tour_O ? O : X;
    cocherCase(cellule, aQuiLeTour);
    if (verifCombiGagnante(aQuiLeTour)) {
        end(false);
    } else if (verifMatchNul()) {
        end(true);
    } else {
        tourSuivant();
    }
}

function messageJoueur(clear) {
    if (clear) {
        document.getElementById("messageJ1").innerText = "";
        document.getElementById("messageJ2").innerText = "";
    } else {
        tour_O ? 
        document.getElementById("messageJ1").innerText = "à ton tour!" :
        document.getElementById("messageJ2").innerText = "à ton tour!" 
    }
}
function cocherCase(cellule, aQuiLeTour) {
    cellule.classList.add(aQuiLeTour);
    cellule.innerText = (aQuiLeTour);
}
function tourSuivant() {
    tour_O = !tour_O;

}

function verifCombiGagnante(aQuiLeTour) {
    return combinaisons.some(combi => {
        return combi.every(index => {
            return cellules[index].classList.contains(aQuiLeTour);
        })
    });
} 

function verifMatchNul() {
    return [...cellules].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(O);
    })
}

function end(matchNul) {
    if (matchNul) {
        message.innerText = "Match Nul !";
    } else {
        message.innerText = `${tour_O ? "Joueur 2" : "Joueur 1"} gagne !`; 
    }
    elementRejouer.classList.add("actif");
    boutonRejouer.addEventListener("click", restart);
    
}

function restart() {
    [...cellules].forEach(cell => {
        cell.classList.remove(O);
        cell.classList.remove(X);
        cell.innerText = "";
        elementRejouer.classList.remove('actif');
        cell.removeEventListener('click', gestionClick);
    });
    start();
}
