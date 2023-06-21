//////////////////////////////////////////////////
// Délcaration des variables DOM

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

const errorMessageSize = document.querySelector(".error-message-size"); // On récupère le bloc du message d'erreur du poids de la photo
const errorMessageSubmit = document.querySelector(".error-message-submit"); // On récupère le bloc du message d'erreur si un des champs est vide

const validateButton = document.querySelector(".validate-button"); // On récupère le bouton valider
const titleInput = document.getElementById("title"); // On récupère la selection du titre

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

    // Désactive l'affichage des messages d'erreur
    errorMessageSize.style.display = "none"; // (Variable déclarée dans modal-add-work.js)
    errorMessageSubmit.style.display = "none";

    // Efface également la photo chargée dans la modal-add-work
    fileDisplay.style.display = "none";

    // Puis réactive tout les éléments pour recharger une nouvelle photo
    pictureIcon.style.display = "block"; // Désactive l'icon picture
    addPictureButton.style.display = "flex"; // Désactive le bouton ajouter une photo
    restrictionsText.style.display = "block"; // Désactive le texte de restrictions

    // Efface également les valeurs des inputs
    titleInput.value = "";
    categoryInput.value = "";
    validateButton.classList.remove("true");
});

//////////////////////////////////////////////////
/**
 *          Fonction d'ajout work
 */
//////////////////////////////////////////////////

async function addWork(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Créer un objet FormData et y ajouter les données
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("category", categoryInput.value);
    formData.append("image", inputFile.files[0]);

    try {
        // Effectuer une requete POST vers l'API pour ajouter le nouveau projet
        const response = await fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();

            window.alert("Projet ajouté avec succès"); // Popup qui préviens de l'ajout effectué

            // Réinitialiser les champs de l'interface utilisateur
            titleInput.value = "";
            categoryInput.value = "";
            inputFile.value = "";
            fileDisplay.style.display = "none";
            validateButton.classList.remove("true");
        }
    } catch (error) {
        console.error(
            "Une erreur s'est produite lors de l'ajout du projet :",
            error
        );
    }
}

// Écouter l'événement de soumission du formulaire
modalAddWork.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // La variable va contenir le texte qui sera affiché dans la popup grace a confirm
    const confirmation = confirm(
        "Êtes-vous sûr de vouloir ajouter ce projet ?"
    );

    if (confirmation) {
        addWork(event); // Appelle la fonction addWork crée précédemment
    }
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

///////////////////////////////////////////////////////////////////////
/**
 *    Colorisation du bouton valider quand les champs sont remplis
 */
///////////////////////////////////////////////////////////////////////

function updateValidationButton() {
    if (
        inputFile.files.length > 0 && // Si le compteur de photos est a 0
        titleInput.value !== "" && // Et les valeurs des input title et category ne sont pas vides
        categoryInput.value !== ""
    ) {
        validateButton.classList.add("true"); // Alors la class "true" est ajoutée au bouton
    } else {
        validateButton.classList.remove("true");
    }
}

// On ecoute les événements de modification des champs et on appel la fonction
inputFile.addEventListener("input", updateValidationButton);
titleInput.addEventListener("input", updateValidationButton);
categoryInput.addEventListener("input", updateValidationButton);

/////////////////////////////////////////////////////////////////////////////
/**
 *  Affichage du message d'erreur quand submit alors qu'un champ est vide
 */
/////////////////////////////////////////////////////////////////////////////

// Fonction pour cacher le message d'erreur
function hideErrorMessage() {
    errorMessageSubmit.style.display = "none";
}

// Affichage du message d'erreur quand submit alors qu'un champ est vide
validateButton.addEventListener("click", (event) => {
    if (
        inputFile.files.length === 0 || // Si le compteur de photos est à 0
        titleInput.value === "" || // Et ou les valeurs des input title et category sont vides
        categoryInput.value === ""
    ) {
        event.preventDefault(); // Empêche la soumission du formulaire
        errorMessageSubmit.style.display = "block";
    } else {
        hideErrorMessage();
    }
});

// Écoute des modifications des champs de saisie pour cacher le message d'erreur a chaque nouvelle saisie
inputFile.addEventListener("input", hideErrorMessage);
titleInput.addEventListener("input", hideErrorMessage);
categoryInput.addEventListener("input", hideErrorMessage);
