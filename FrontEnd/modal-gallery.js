//////////////////////////////////////////////////
// Délcaration des variables DOM

const modalContainer = document.querySelector(".modal-container"); // On récupère le block modal entier
const modalTriggers = document.querySelectorAll(".modal-trigger"); // On récupère les boutons ouvrir, fermer et l'overlay
const galleryEdit = document.querySelector(".gallery-edit"); // On récupère le block edit avec les travaux
const deleteIcon = document.querySelector(".delete-input"); // On récupère liicone de suppression des travaux

//////////////////////////////////////////////////
/**
 *   Ouverture et fermeture de la modal gallery
 */
//////////////////////////////////////////////////

// Fonction qui ouvre la modal
function openModal() {
  modalContainer.classList.add("active");
}
// Fonction qui ferme la modal
function closeModal() {
  modalContainer.classList.remove("active");

  // Désactive l'affichage du message d'erreur dans la modal-add-work concernant la taille en mo s'il a été appelé
  errorMessageSize.style.display = "none"; // (Variable déclarée dans modal-add-work.js)

  // Efface également la photo chargée dans la modal-add-work
  fileDisplay.style.display = "none";
  // Puis réactive tout les éléments pour recharger une nouvelle photo
  pictureIcon.style.display = "block"; // Désactive l'icon picture
  addPictureButton.style.display = "flex"; // Désactive le bouton ajouter une photo
  restrictionsText.style.display = "block"; // Désactive le texte de restrictions
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
 *    Fonction d'Affichage des travaux dans la modal gallery
 */
///////////////////////////////////////////////////////////////

function editWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const galleryEditFigure = document.createElement("figure"); // Création de la balise dédiée aux figures

    const galleryEditImage = document.createElement("img"); // Création de la balise dédiée aux images
    galleryEditImage.src = work.imageUrl; // On va récupérer la source de l'image dans l'API
    galleryEditImage.alt = work.title; // On va récupérer l'alt de l'image dans l'API
    galleryEditImage.classList.add("draggable"); // on ajoute une class pour la gestion du deplacement futur

    const galleryDeleteIcon = document.createElement("i"); // Création de l'icone de supression
    galleryDeleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-input");

    const galleryMoveIcon = document.createElement("i"); // Création de l'icone de deplacement
    galleryMoveIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    const galleryEditText = document.createElement("figcaption"); // Création de la balise dédiée aux texte
    galleryEditText.innerText = "éditer";

    // On rattache les balises créées à leurs sections respectives
    galleryEdit.appendChild(galleryEditFigure);
    galleryEditFigure.appendChild(galleryEditImage);
    galleryEditFigure.appendChild(galleryEditText);
    galleryEditFigure.appendChild(galleryDeleteIcon);
    galleryEditFigure.appendChild(galleryMoveIcon);
  }
}

///////////////////////////////////////////////////////////////
/**
 *      Fonction de Récupération des travaux depuis l'API
 */
///////////////////////////////////////////////////////////////

async function editFetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works"); // Attente de la réponse
    const works = await response.json(); // Attente de la conversion en JSON

    editWorks(works); // Appel à la fonction pour afficher les travaux

    ///////////////////////////////////////////////////////////////
    /**
     *      Fonction de Suppression des travaux depuis l'API
     */
    ///////////////////////////////////////////////////////////////

    // deleteIcon.addEventListener("click", async (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   const deleteWorkId = works.id;
    //   const token = localStorage.getItem("token"); // On récupère le token du localStorage

    //   let response = await fetch(
    //     `http://localhost:5678/api/works/${deleteWorkId}`,
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
    //   } else {
    //     alert("Echec de suppression");
    //   }
    // });
  } catch (error) {
    throw new Error("Une erreur s'est produite", error);
  }
}

// Appel de la fonction de Récupération des travaux depuis l'API
editFetchWorks();

/////////////////////////////////////////////////
/**
 *          Déplacement des travaux
 */
/////////////////////////////////////////////////
