//////////////////////////////////////////////////

const modalGallery = document.querySelector(".modal-gallery"); // On récupère la modal gallery
const modalAddWork = document.querySelector(".modal-add-work"); // On récupère la modal pour ajouter les photos
const addWorkButton = document.querySelector(".add-work-button"); // On récupère le bouton pour ouvrir la modal d'ajout de photo
const returnBack = document.querySelector(".fa-arrow-left"); // On récupère l'icone de retour en arriere

const categoryInput = document.getElementById("categories"); // On récupère la selection des catégories

const inputFile = document.querySelector("input[type=file]"); // On récupère l'input pour ajouter une photo
const fileDisplay = document.getElementById("fileDisplay"); // On récupère l'image affiché ensuite à sa place

const pictureIcon = document.querySelector(".fa-image"); // On récupère l'icon de l'image
const addPictureButton = document.querySelector(".add-picture"); // On récupère le bouton "ajouter photo"
const restrictionsText = document.querySelector(".picture-section p"); // On récupère le texte de restrictions

const errorMessageSize = document.querySelector(".error-message-size"); // On récupère le bloc du message d'erreur

//////////////////////////////////////////////////
/**
 *   Ouverture et fermeture de la modal add work
 */
//////////////////////////////////////////////////

// Ouvre la modal lorsque clique sur Ajouter Photo
addWorkButton.addEventListener("click", () => {
  modalAddWork.style.display = "block";
  // Désactive au passage la modal gallery
  modalGallery.style.display = "none";
});

// Retourne en arriere lors du click sur l'icone fleche
returnBack.addEventListener("click", () => {
  modalAddWork.style.display = "none";
  // Réactive au passage la modal gallery
  modalGallery.style.display = "block";

  // Désactive l'affichage du message d'erreur dans la modal-add-work concernant la taille en mo s'il a été appelé
  errorMessageSize.style.display = "none"; // (Variable déclarée dans modal-add-work.js)

  // Efface également la photo chargée dans la modal-add-work
  fileDisplay.style.display = "none";
  // Puis réactive tout les éléments pour recharger une nouvelle photo
  pictureIcon.style.display = "block"; // Désactive l'icon picture
  addPictureButton.style.display = "flex"; // Désactive le bouton ajouter une photo
  restrictionsText.style.display = "block"; // Désactive le texte de restrictions
});

///////////////////////////////////////////////////////////
/**
 *  Afficher l'image chargée à la place de "Ajouter photo"
 */
///////////////////////////////////////////////////////////

inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Objet de type FileList dont on récupère le premier (0)

  // Vérifie si la taille du fichier dépasse la limite de 4 Mo (en octets)
  if (file.size > 4194304) {
    errorMessageSize.style.display = "block"; // Active l'affichage du message d'erreur

    inputFile.value = ""; // Réinitialise la valeur de l'input file pour effacer le fichier sélectionné
  } else {
    errorMessageSize.style.display = "none"; // Désactive l'affichage du message d'erreur s'il a été appelé

    fileDisplay.style.display = "block"; // Active l'affichage de l'image chargée

    pictureIcon.style.display = "none"; // Désactive l'icon picture
    addPictureButton.style.display = "none"; // Désactive le bouton ajouter une photo
    restrictionsText.style.display = "none"; // Désactive le texte de restrictions

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      fileDisplay.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  }
});

//////////////////////////////////////////////////
/**
 *      Choix de la catégorie "dynamique"
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
