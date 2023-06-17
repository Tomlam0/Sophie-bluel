//////////////////////////////////////////////////

const modalAddWork = document.querySelector(".modal-add-work"); // On récupère la modal pour ajouter les photos
const addWorkButton = document.querySelector(".add-work-button"); // On récupère le bouton pour ouvrir la modal d'ajout de photo
const returnBack = document.querySelector(".fa-arrow-left"); // On récupère l'icone de retour en arriere

//////////////////////////////////////////////////
/**
 *       Ouverture de la modal add work
 */
//////////////////////////////////////////////////

// Ouvre la modal lorsque clique sur Ajouter Photo
addWorkButton.addEventListener("click", () => {
  modalAddWork.style.display = "block";
});

//////////////////////////////////////////////////
/**
 *        Retour a la modal gallery
 */
//////////////////////////////////////////////////

// Retourne en arriere lors du click sur l'icone fleche
returnBack.addEventListener("click", () => {
  modalAddWork.style.display = "none";
});
