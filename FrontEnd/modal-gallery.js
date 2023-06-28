//////////////////////////////////////////////////
// Délcaration des variables DOM

const modalContainer = document.querySelector(".modal-container"); // On récupère le block modal entier
const modalTriggers = document.querySelectorAll(".modal-trigger"); // On récupère les boutons ouvrir, fermer et l'overlay
const galleryEdit = document.querySelector(".gallery-edit"); // On récupère le block edit avec les travaux

////////////////////////////////////////////////////////////
/*
 *   Fonctions d'ouverture / fermeture de la modal gallery
 */
////////////////////////////////////////////////////////////

// Fonction qui ouvre la modal
function openModal() {
    modalContainer.classList.add("active");
}
// Fonction qui ferme la modal
function closeModal() {
    modalContainer.classList.remove("active");

    // Désactive l'affichage des messages d'erreur
    errorMessageSize.style.display = "none";
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
}

// Ajoute un gestionnaire d'événement pour ouvrir la modal lorsque clique sur un bouton avec la classe "modal-trigger"
modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", openModal)
);

// Ajoute un gestionnaire d'événement pour fermer la modal lorsque l'on clique à l'extérieur de celle-ci
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-trigger")) {
        closeModal();
    }
});

////////////////////////////////////////////////////////////////////
/*
 *    Fonction d'Affichage dynamique des travaux dans la modal
 */
////////////////////////////////////////////////////////////////////

function createWorkElement(work) {
    const galleryEditFigure = document.createElement("figure"); // Création de la balise dédiée aux figures

    // On lui ajoute comme enfants les balises img, figcaption et les icones
    galleryEditFigure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>éditer</figcaption>
        <i class="fa-solid fa-trash-can delete-input"></i>
        <i class="fa-solid fa-arrows-up-down-left-right"></i>
    `;

    // On récupère l'icone de suppression des travaux générée dans la fonction elle-même
    const deleteIcon = galleryEditFigure.querySelector(".delete-input");

    // On detecte le click sur cette icone
    deleteIcon.addEventListener("click", () => {
        showDeleteConfirmation(work.id); // On apelle la fonction qui demande la confirmation à l'utilisateur déclarée plus bas
    });

    return galleryEditFigure; // Permet de réutiliser la fonction dans la variable workElement plus bas
}

///////////////////////////////////////////////////////////////
/*
 *      Fonction de Récupération des travaux depuis l'API
 */
///////////////////////////////////////////////////////////////

async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();

        works.forEach((work) => {
            const workElement = createWorkElement(work); // On stock la fonction qui crée les éléments dans une variable
            galleryEdit.appendChild(workElement); // On ajoute chaque travaux comment enfants de la gallerie
        });
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

////////////////////////////////////////////
/*
 *   Fonction de suppression des travaux
 */
////////////////////////////////////////////

async function deleteWork(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            window.alert("Projet supprimé avec succès"); // Popup qui préviens de la supression effectué
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

// Fonction qui ouvre une popup du navigateur pour demander à l'utilisateur la confirmation
function showDeleteConfirmation(id) {
    // La variable va contenir le texte qui sera affiché dans la popup grace a confirm
    const confirmation = confirm(
        "Êtes-vous sûr de vouloir supprimer ce projet ?"
    );
    if (confirmation) {
        deleteWork(id); // On apelle la fonction de suppression si l'utilisateur click sur "ok"
    }
}

fetchWorks(); // Appel de la fonction générale de Récupération des travaux depuis l'API
