//////////////////////////////////////////////////
// Délcaration des variables DOM

const gallery = document.querySelector(".gallery"); // On va chercher la galerie dans le DOM
const baliseFiltre = document.querySelector(".filtres"); // On va chercher la balise des filtres
const btnTous = document.querySelector(".btn-tous"); // On va chercher le filtre "tous"

////////////////////////////////////////////////////////////////
/*
 *   Fonction d'Affichage des travaux sur la homepage du site
 */
////////////////////////////////////////////////////////////////

// Le paramètre works concerne la variable qui fetch les données de l'API
function displayWorks(works) {
    gallery.innerHTML = ""; // On efface le contenu actuel de la galerie

    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const galleryFigure = document.createElement("figure"); // Création de la balise dédiée aux figures

        const galleryImage = document.createElement("img"); // Création de la balise dédiée aux images
        galleryImage.src = work.imageUrl; // On va récupérer la source de l'image dans l'API
        galleryImage.alt = work.title; // On va récupérer l'alt de l'image dans l'API

        const galleryFigcaption = document.createElement("figcaption"); // Création de la balise dédiée aux figcaptions
        galleryFigcaption.innerText = work.title; // On va récupérer le titre de l'image dans l'API

        // On rattache les balises créées à leurs sections respectives
        gallery.appendChild(galleryFigure);
        galleryFigure.appendChild(galleryImage);
        galleryFigure.appendChild(galleryFigcaption);
    }
}

///////////////////////////////////////////////////////
/*
 *   Fonction de Récupération des travaux depuis l'API
 */
///////////////////////////////////////////////////////

async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
        const works = await response.json(); // Attente de la conversion en JSON

        displayWorks(works); // Appel à la fonction pour afficher les travaux

        /////////////////////////////////////////////////
        /*
         *           Filtrage des boutons
         */
        /////////////////////////////////////////////////

        // Ecoute du bouton "Tous"
        btnTous.addEventListener("click", () => {
            displayWorks(works); // Fait a nouveau appel à la fonction pour afficher les travaux
        });

        // On Fetch la section "category" de l'API cette fois
        const category = await fetch("http://localhost:5678/api/categories"); // Attente de la réponse
        const btnFiltre = await category.json(); // Attente de la conversion en JSON

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

                displayWorks(filteredWorks); // Appel de la fonction avec comme paramètre la variable filtrante
            });
        });

        // Gestion des erreurs
    } catch (error) {
        throw new Error(
            "Une erreur s'est produite lors de la récupération des travaux :",
            error
        );
    }
}

// Appel de la fonction de Récupération des travaux depuis l'API
fetchWorks();
