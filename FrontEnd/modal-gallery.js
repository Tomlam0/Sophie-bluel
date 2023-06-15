///////////////////////////////////////////////////////////////
/**
 *      Ouverture de la modal au click sur modifier
 */
///////////////////////////////////////////////////////////////

const modalTrigger = document.querySelector(".modif-projets"); // On récupère le bouton modifier
const modalDisplay = document.querySelector(".modal-container"); // On récupère le block modal entier
const modalWindow = document.querySelector(".modal"); // On récupère la modal toute seule
const modalCloseButton = document.querySelector(".fa-xmark"); // On récupère l'icone close

// Fonction qui active la modal
const openModal = () => {
  modalDisplay.style.display = "block";
};

modalTrigger.addEventListener("click", openModal);

///////////////////////////////////////////////////////////////
/**
 *              Fermeture de la modal
 */
///////////////////////////////////////////////////////////////

// Fonction qui désactive la modal
const closeModal = () => {
  modalDisplay.style.display = "none";
};

// Ferme la modal avec l'icone
modalCloseButton.addEventListener("click", closeModal);

// Ferme la modal avec click en dehors
// document.addEventListener("click", (event) => {
//   if (
//     !modalWindow.contains(event.target) &&
//     modalDisplay.style.display === "block"
//   ) {
//     closeModal();
//   }
// });

///////////////////////////////////////////////////////////////
/**
 *     ----
 */
///////////////////////////////////////////////////////////////

// function genererPhotosModal(photosModal) {
//   //Création d'une boucle qui va prendre toutes les photos
//   for (let i = 0; i < photosModal.length; i++) {
//     // Création des balises
//     const article = photosModal[i];

//     const sectionGallery = document.querySelector(".galleryModal");

//     const articleElement = document.createElement("article");
//     articleElement.classList.add("photosRealisation");
//     articleElement.dataset.id = [i];

//     const idElement = document.createElement("p");
//     idElement.innerText = article.id;

//     const titleElement = document.createElement("p");
//     titleElement.innerText = "editer";

//     // Ajout de l'icone supprimer
//     const iconeElement = document.createElement("i");
//     iconeElement.classList.add("deletePhoto");
//     iconeElement.innerHTML = '<<i class="fa-regular fa-trash-can"></i>';

//     const imageElement = document.createElement("img");
//     imageElement.src = article.imageUrl;

//     const categoryIdElement = document.createElement("p");
//     categoryIdElement.innerText = article.categoryId;

//     //Ajout de articleElement dans sectionGallery

//     sectionGallery.appendChild(articleElement);

//     //Ajout de nos balises au DOM
//     articleElement.appendChild(imageElement);
//     articleElement.appendChild(titleElement);
//   }
//   articleElement.appendChild(iconeElement);

//   //--------------Suppression photo--------------------------------
//   iconeElement.addEventListener("click", async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const iconeElement = article.id;
//     let monToken = localStorage.getItem("token");
//     console.log(iconeElement);
//     let response = await fetch(
//       `http://localhost:5678/api/works/${iconeElement}`,
//       {
//         method: "DELETE",
//         headers: {
//           accept: "*/*",
//           Authorization: `Bearer ${"token"}`,
//         },
//       }
//     );
//     if (response.ok) {
//       return false;
//       // if HTTP-status is 200-299
//       //alert("Photo supprimé avec succes");
//       // obtenir le corps de réponse (la méthode expliquée ci-dessous)
//     } else {
//       alert("Echec de suppression");
//     }
//   });
// }
