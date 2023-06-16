//////////////////////////////////////////////////
/**
 *       Ouverture et fermeture de la modal
 */
//////////////////////////////////////////////////

const modalContainer = document.querySelector(".modal-container"); // On récupère le block modal entier
const modalTriggers = document.querySelectorAll(".modal-trigger"); // On récupère les boutons ouvrir, fermer et l'overlay

// Fonction qui ouvre la modal
function openModal() {
  modalContainer.classList.add("active");
}
// Fonction qui ferme la modal
function closeModal() {
  modalContainer.classList.remove("active");
}

// Ajoute un gestionnaire d'événement pour ouvrir la modal lorsque clique sur un bouton avec la classe "modal-trigger"
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", openModal)
);

// Ajoute un gestionnaire d'événement pour fermer la modal lorsque vous cliquez à l'extérieur de celle-ci
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal-trigger")) {
    closeModal(); // Ferme la modal
  }
});

///////////////////////////////////////////////////////////////
/**
 *        Génération de la gallerie dans la modal
 */
///////////////////////////////////////////////////////////////

// Fonction d'Affichage des travaux

function editWorks(works) {
  const galleryEdit = document.querySelector(".gallery-edit");

  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const galleryEditFigure = document.createElement("figure"); // Création de la balise dédiée aux figures

    const galleryEditImage = document.createElement("img"); // Création de la balise dédiée aux images
    galleryEditImage.src = work.imageUrl; // On va récupérer la source de l'image dans l'API
    galleryEditImage.alt = work.title; // On va récupérer l'alt de l'image dans l'API

    const galleryDeleteIcon = document.createElement("i"); // Création de l'icone de supression
    galleryDeleteIcon.classList.add("fa-solid", "fa-trash-can");

    const galleryEditText = document.createElement("figcaption"); // Création de la balise dédiée aux texte
    galleryEditText.innerText = "éditer";

    // On rattache les balises créées à leurs sections respectives
    galleryEdit.appendChild(galleryEditFigure);
    galleryEditFigure.appendChild(galleryEditImage);
    galleryEditFigure.appendChild(galleryEditText);
    galleryEditFigure.appendChild(galleryDeleteIcon);
  }
}

// Fonction de Récupération des travaux depuis l'API

async function editFetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    editWorks(works); // Appel à la fonction (l.39) pour afficher les travaux
  } catch (error) {
    throw new Error(
      "Une erreur s'est produite lors de la récupération des travaux :",
      error
    );
  }
}

// Appel de la fonction de Récupération des travaux depuis l'API (l.38)
editFetchWorks();

/////////////////////////////////////////////////
/**
 *            Suppression des travaux
 */
/////////////////////////////////////////////////

// iconeElement.addEventListener("click", async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const iconeElement = article.id;
//   let monToken = localStorage.getItem("token");
//   console.log(iconeElement);
//   let response = await fetch(
//     `http://localhost:5678/api/works/${iconeElement}`,
//     {
//       method: "DELETE",
//       headers: {
//         accept: "*/*",
//         Authorization: `Bearer ${"token"}`,
//       },
//     }
//   );
//   if (response.ok) {
//     return false;
//     // if HTTP-status is 200-299
//     //alert("Photo supprimé avec succes");
//     // obtenir le corps de réponse (la méthode expliquée ci-dessous)
//   } else {
//     alert("Echec de suppression");
//   }
// });
