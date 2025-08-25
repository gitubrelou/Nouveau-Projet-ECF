import { sites } from "../data/sites.js";
import { afficherPopUp, popupMovements }from "./Formulaire.js";
import { filtrerSitesParRecherche, filtrerParCategorie } from "../Dossier Scripts/FiltreTriage.js";


function afficherAccueil() {
    document.querySelector(".main-content").innerHTML = `
        <section class="accueil-bg">
            <h2>Ne perdez plus de temps à chercher un site au hasard !</h2>
            <p>Voici un annuaire bien pratique qui vous fera gagner du temps pour vos navigations web.
            Sélectionnez une catégorie dans le menu pour découvrir des sites pertinents et utiles dans les domaines les plus consultés.
            </p>
        </section>
    `;
}

// Fonction d'affichage factorisée
function afficherSites(sitesToShow = sites) {
    let mainPage = "";
    sitesToShow.forEach((site) => {
        mainPage += `<div class="site-card">
            <h2>${site.name}</h2>
            <p class="paragraphSite">${site.description}</p>
            <a class="transformText" href="${site.url}" target="_blank">Visiter le site</a>
            <img src="${site.image}" alt="" width="100px" height="100px">
        </div>`;
    });
    document.querySelector(".main-content").innerHTML = mainPage;

    // Ajoute la classe visible avec un léger délai pour déclencher la transition
    setTimeout(() => {
        document.querySelectorAll('.site-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 10);
}



// Affichage initial
afficherAccueil();
//Afficher Form
afficherPopUp();
//Form mobilitée
popupMovements(); 

//Filtrage Searchbox
document.querySelector('.search-box input').addEventListener('input', function() {
    filtrerSitesParRecherche(this.value, afficherAccueil, afficherSites);
});

// Ajoute le filtre sur la nav
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        filtrerParCategorie(e, sites, afficherAccueil, afficherSites);
    });
});
//Ajoute le filtre sur la aside
document.querySelectorAll('.asideNav2 a').forEach(link => {
    link.addEventListener('click', function(e) {
        filtrerParCategorie(e, sites, afficherAccueil, afficherSites);
    });
});









