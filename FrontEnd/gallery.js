/////////////////////////////////////////////////
/**
 * Récupération des travaux depuis l'API
 */
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    // Gestion des travaux récupérés
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
 * Affichage des travaux sur le site
 */
function displayWorks(works) {
  for (let i = 0; i < works.length; i++) {
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
  }
}

/////////////////////////////////////////////////
/**
 * Affichage des boutons pour filtrer le contenu des travaux
 */
