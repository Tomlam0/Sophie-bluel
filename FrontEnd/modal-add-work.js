//////////////////////////////////////////////////

const modalGallery = document.querySelector(".modal-gallery"); // On récupère la modal gallery
const modalAddWork = document.querySelector(".modal-add-work"); // On récupère la modal pour ajouter les photos
const addWorkButton = document.querySelector(".add-work-button"); // On récupère le bouton pour ouvrir la modal d'ajout de photo
const returnBack = document.querySelector(".fa-arrow-left"); // On récupère l'icone de retour en arriere

const categoryInput = document.getElementById("categories"); // On récupère la selection des catégories

//////////////////////////////////////////////////
/**
 *       Ouverture de la modal add work
 */
//////////////////////////////////////////////////

// Ouvre la modal lorsque clique sur Ajouter Photo
addWorkButton.addEventListener("click", () => {
  modalAddWork.style.display = "block";
  // Désactive au passage la modal gallery
  modalGallery.style.display = "none";
});

//////////////////////////////////////////////////
/**
 *        Retour a la modal gallery
 */
//////////////////////////////////////////////////

// Retourne en arriere lors du click sur l'icone fleche
returnBack.addEventListener("click", () => {
  modalAddWork.style.display = "none";
  // Réactive au passage la modal gallery
  modalGallery.style.display = "block";
});

//////////////////////////////////////////////////
/**
 *        Choix de la catégorie dynamique
 */
//////////////////////////////////////////////////

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      const option = document.createElement("option"); // On va créer les balises options dans le select
      option.value = category.id;
      option.textContent = category.name;
      categoryInput.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });

//////////////////////////////////////////////////
/**
 *          Fonction d'ajout work
 */
//////////////////////////////////////////////////

// const answer = await fetch('http://localhost:5678/api/works/', {
//         method: 'POST',
//         headers: {'Authorization': `Bearer ${myToken}`},
//         body: formData
//     });
