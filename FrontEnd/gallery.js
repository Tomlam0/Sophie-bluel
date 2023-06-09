/////////////////////////////////////////////////

// Variable pour récupérer le localStorage (voir ligne 19)
let worksData = JSON.parse(localStorage.getItem("worksData")) || [];

/////////////////////////////////////////////////
/**
 * Fonction de Récupération des travaux depuis l'API
 */
/////////////////////////////////////////////////
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    // Transformation de la variable works en string JSON
    const worksStringify = JSON.stringify(works);
    // On Stock la chaîne de caractères dans le localStorage (clé, valeur)
    localStorage.setItem("worksData", worksStringify);

    // Gestion d'Affichage des travaux récupérés,on retourne la fonction qui affiche les travaux délcaré plus bas
    displayWorks(worksData);

    /////////////////////////////////////////////////
    /**
     * Fonction de filtrage des boutons
     */
    /////////////////////////////////////////////////

    // ***** Bouton Tous ***** //
    const btnTous = document.querySelector(".btn-tous");
    btnTous.addEventListener("click", function () {
      // On efface le contenu actuel de la galerie (on double la query qui est aussi plus bas)
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      // On retourne à nouveau la fonction qui affiche les travaux
      displayWorks(worksData);
    });

    // ***** Bouton Objets ***** //
    const btnObjets = document.querySelector(".btn-objets");
    btnObjets.addEventListener("click", function () {
      const filteredWorks = worksData.filter((work) => work.categoryId === 1);
      displayWorks(filteredWorks);
    });

    // ***** Bouton Appartements ***** //
    const btnAppartements = document.querySelector(".btn-appartements");
    btnAppartements.addEventListener("click", function () {
      const filteredWorks = worksData.filter((work) => work.categoryId === 2);
      displayWorks(filteredWorks);
    });

    // ***** Bouton Hotels & Restaurants ***** //
    const btnHotEtRes = document.querySelector(".btn-hot-et-res");
    btnHotEtRes.addEventListener("click", function () {
      const filteredWorks = worksData.filter((work) => work.categoryId === 3);
      displayWorks(filteredWorks);
    });

    // Gestion des erreurs
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la récupération des travaux :",
      error
    );
  }
}
// On appelle ensuite la fonction
fetchWorks();

/////////////////////////////////////////////////
/**
 * Fonction d'Affichage des travaux sur le site
 */
/////////////////////////////////////////////////
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

  // On efface le contenu actuel de la galerie
  gallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    // Cette variable stocke l'index des travaux convertis en JSON plus haut
    const work = works[i];

    // Creation de la balise dédiée aux figures
    const galleryFigure = document.createElement("figure");

    // Création de la balise dédiée aux images
    const galleryImage = document.createElement("img");
    // On va récupérer la source de l'image dans l'API
    galleryImage.src = work.imageUrl;
    // On va récupérer l'alt de l'image dans l'API
    galleryImage.alt = work.title;

    // Création de la balise dédiée aux figcaptions
    const galleryFigcaption = document.createElement("figcaption");
    galleryFigcaption.innerText = work.title;

    // On rattache les balises créées à leurs sections respectives
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(galleryFigcaption);
    gallery.appendChild(galleryFigure);
  }
}
