///////////////////////////////////////////////////////////////
// Délcaration des variables DOM

const token = localStorage.getItem("token"); // On récupère le token du localStorage

const editDisplay = document.querySelector(".edit-section"); // On va chercher la section edit login dans le DOM

const loginDisplay = document.querySelector(".login"); // On va chercher l'élément login dans le DOM
const logoutDisplay = document.querySelector(".logout"); // On va chercher l'élément logout dans le DOM

const modifPhotoDisplay = document.querySelector(".modif-photo"); // On va chercher l'élément modif photo dans le DOM
const modifProjetsDisplay = document.querySelector(".modif-projets"); // On va chercher l'élément modif projet dans le DOM

const filterDisplay = document.querySelector(".filtres"); // On va chercher l'élément filtres dans le DOM

///////////////////////////////////////////////////////////////
/**
 *  Affichage des éléments d'edit de la homepage si login ok
 */
///////////////////////////////////////////////////////////////

// Si le token existe dans le localStorage
if (token !== null) {
    editDisplay.style.display = "flex"; // on active la section edit

    loginDisplay.style.display = "none"; // on desactive l'élément login
    logoutDisplay.style.display = "block"; // on active l'élément logout

    modifPhotoDisplay.style.display = "flex"; // on active la modif projets
    modifProjetsDisplay.style.display = "flex"; // on active la modif projets

    filterDisplay.style.display = "none"; // on desactive les filtres

    // Le token n'existe pas dans le localStorage
} else {
    loginDisplay.style.display = "block"; // on active l'élément login
    logoutDisplay.style.display = "none"; // on desactive l'élément logout
}

///////////////////////////////////////////////////////////////
/**
 *  Click sur le logout pour delete le token
 */
///////////////////////////////////////////////////////////////

logoutDisplay.addEventListener("click", () => {
    window.localStorage.removeItem("token");
});
