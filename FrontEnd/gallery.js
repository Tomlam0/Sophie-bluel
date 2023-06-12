/////////////////////////////////////////////////
/**
 * Fonction d'Affichage des travaux sur le site
 */
/////////////////////////////////////////////////

// Le paramètre works concerne la variable qui fetch les données de l'API (l.41)
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

  gallery.innerHTML = ""; // On efface le contenu actuel de la galerie

  for (let i = 0; i < works.length; i++) {
    const work = works[i]; // Cette variable stocke l'index des travaux convertis en JSON plus haut

    const galleryFigure = document.createElement("figure"); // Création de la balise dédiée aux figures

    const galleryImage = document.createElement("img"); // Création de la balise dédiée aux images
    galleryImage.src = work.imageUrl; // On va récupérer la source de l'image dans l'API
    galleryImage.alt = work.title; // On va récupérer l'alt de l'image dans l'API

    const galleryFigcaption = document.createElement("figcaption"); // Création de la balise dédiée aux figcaptions
    galleryFigcaption.innerText = work.title; // On va récupérer le titre de l'image dans l'API

    // On rattache les balises créées à leurs sections respectives
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(galleryFigcaption);
    gallery.appendChild(galleryFigure);
  }
}

/////////////////////////////////////////////////
/**
 * Fonction de Récupération des travaux depuis l'API
 */
/////////////////////////////////////////////////

async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    displayWorks(works); // Appel à la fonction (l.8) pour afficher les travaux

    /////////////////////////////////////////////////
    /**
     *           Filtrage des boutons
     */
    /////////////////////////////////////////////////

    // Rattachement et Ecoute du bouton "Tous"
    const btnTous = document.querySelector(".btn-tous");
    btnTous.addEventListener("click", () => {
      displayWorks(works); // Fait a nouveau appel à la fonction pour afficher les travaux
    });

    // On Fetch la section "category" de l'API cette fois
    const category = await fetch("http://localhost:5678/api/categories"); // Attente de la réponse
    const btnFiltre = await category.json(); // Attente de la conversion en JSON

    let baliseFiltre = document.querySelector(".filtres"); // On va chercher la balise HTML

    // La boucle qui va parcourir l'API et créer un nouveau bouton pour chaque catégorie
    btnFiltre.forEach((element) => {
      let newButton = document.createElement("button");

      // On donne une class a la balise bouton
      newButton.setAttribute(
        "class",
        element.name
          .replace(/\s+/g, "-") // Remplace les espaces par des tirets
          .replace(/&/g, "-") // Supprime les "&" qui sont mal supportés en CSS
          .replace(/-+/g, "-") // Remplace les enchaînements de tirets par un seul
          .toLowerCase() // Tout en minuscules
      );

      newButton.textContent = element.name; // Et on détermine le texte à l'intérieur

      baliseFiltre.appendChild(newButton); // la variable qui contient la balise va hériter des boutons

      // Écoute du clic sur les boutons filtre
      newButton.addEventListener("click", () => {
        const filteredWorks = works.filter(
          (work) => work.categoryId === element.id
        );

        displayWorks(filteredWorks); // Appel de la fonction (l.8) avec comme paramètre la variable filtrante
      });
    });

    // Gestion des erreurs
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la récupération des travaux :",
      error
    );
  }
}

// Appel de la fonction de Récupération des travaux depuis l'API (l.38)
fetchWorks();
