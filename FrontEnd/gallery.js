/////////////////////////////////////////////////

let worksData = []; // Variable pour stocker les données de l'API et les réutiliser partout

/////////////////////////////////////////////////
/**
 * Fonction de Récupération des travaux depuis l'API
 */
/////////////////////////////////////////////////
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    worksData = works; // Stocke les données des travaux

    // Gestion des travaux récupérés, on return la fonction qui affiche les travaux en JSON
    displayWorks(works);

    // Gestion des erreurs
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la récupération des travaux :",
      error
    );
  }
}
// On appel la fonction
fetchWorks();

/////////////////////////////////////////////////
/**
 * Fonction d'Affichage des travaux sur le site
 */
/////////////////////////////////////////////////
function displayWorks(works) {
  for (let i = 0; i < works.length; i++) {
    // Cette variable stock l'index des travaux converties en JSON plus haut
    const work = works[i];

    // Selection de la gallery qui accueillera les travaux
    const gallery = document.querySelector(".gallery");

    // Creation de la balise dédiée aux figures
    const galleryFigure = document.createElement("figure");

    // Création de la balise dédiée aux images
    const galleryImage = document.createElement("img");
    // On va récupérer la source de l'image dans l'API
    galleryImage.src = work.imageUrl;
    // On va récupérer l'alt l'image dans l'API
    galleryImage.alt = work.title;

    // Création de la balise dédiée aux figcaptions
    const galleryFigcaption = document.createElement("figcaption");
    galleryFigcaption.innerText = work.title;

    // On rattache les balises créees à leurs sections réspectives

    // On rattache figure a gallery
    gallery.appendChild(galleryFigure);
    // On inclue img dans figure
    galleryFigure.appendChild(galleryImage);
    // On inclue figcaption dans figure
    galleryFigure.appendChild(galleryFigcaption);

    /////////////////////////////////////////////////
    /**
     * Gestionnaire d'événement pour les filtres
     */
    /////////////////////////////////////////////////

    // On stock les variables appelant les boutons dans le DOM
    const btn = document.querySelectorAll(".filtre button"); // Stock tous les boutons filtres

    const btnTous = document.querySelector(".btn-tous"); // Stock le bouton Tous
    const btnObjets = document.querySelector(".btn-objets"); // Stock tout le bouton Objets
    const btnAppartements = document.querySelector(".btn-appartements"); // Stock le Appartements
    const btnHotEtRes = document.querySelector(".btn-hot-et-res"); // Stock le bouton H & R

    // ***** Bouton Objets ***** //

    // On crée un évènement d'écoute au click sur le bouton Objets
    btnObjets.addEventListener("click", function () {
      // On stock dans une variable les données de l'API pour cette catégorie
      const categorieObjets = { id: 1, name: "Objets" };

      // On déclare une variable qui filtre les travaux
      const worksObjets = worksData.filter(
        (work) => work.categoryId === categorieObjets.id
      );

      // On efface le contenu actuel de la galerie
      gallery.innerHTML = "";

      // On apelle la fonction d'affichage précédente avec les paramètres de la variables filtrante
      displayWorks(worksObjets);
    });

    // ***** Bouton Appartements ***** //

    // On crée un évènement d'écoute au click sur le bouton Appartements
    btnAppartements.addEventListener("click", function () {
      // On stock dans une variable les données de l'API pour cette catégorie
      const categorieAppartements = { id: 2, name: "Appartements" };

      // On déclare une variable qui filtre les travaux
      const worksAppartements = worksData.filter(
        (work) => work.categoryId === categorieAppartements.id
      );

      // On efface le contenu actuel de la galerie
      gallery.innerHTML = "";

      // On apelle la fonction d'affichage précédente avec les paramètres de la variables filtrante
      displayWorks(worksAppartements);
    });

    // ***** Bouton Hotels & Restaurants ***** //

    // On crée un évènement d'écoute au click sur le bouton Appartements
    btnHotEtRes.addEventListener("click", function () {
      // On stock dans une variable les données de l'API pour cette catégorie
      const categorieHotEtRes = { id: 3, name: "Hotels & restaurants" };

      // On déclare une variable qui filtre les travaux
      const worksHotEtRes = worksData.filter(
        (work) => work.categoryId === categorieHotEtRes.id
      );

      // On efface le contenu actuel de la galerie
      gallery.innerHTML = "";

      // On apelle la fonction d'affichage précédente avec les paramètres de la variables filtrante
      displayWorks(worksHotEtRes);
    });
  }
}
