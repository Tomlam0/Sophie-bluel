/////////////////////////////////////////////////
// Délcaration des variables DOM

const loginForm = document.getElementById("login"); // On va récupérer la section form en entier dans le DOM

const errorMessage = document.querySelector(".error-message"); // On va récupérer le message d'erreur

const passwordField = document.getElementById("password"); // On va chercher l'input du password dans le DOM
const eye = document.querySelector(".fa-eye"); // On va chercher les éléments icone dans le DOM
const eyeOff = document.querySelector(".fa-eye-slash");

/////////////////////////////////////////////////
/**
 *      Envoi du formulaire de connexion
 */
/////////////////////////////////////////////////

// On va utiliser le paramètre submit, c'est donc le formulaire entier qui doit être pris en compte
loginForm.addEventListener("submit", (event) => {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();

    //Appel de la fonction qui fetch l'API (l.24)
    login();
});

/////////////////////////////////////////////////
/**
 *     Fonction de login qui fetch l'API
 */
/////////////////////////////////////////////////

async function login() {
    try {
        // la variable va chercher dans l'API si les éléments de connexion sont valides
        const loginResponse = await fetch(
            "http://localhost:5678/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                }),
            }
        );

        const loginResult = await loginResponse.json(); // Attente de la conversion en JSON

        if (loginResponse.ok) {
            // Si les identifiants sont ok, on identifie la partie token du JSON
            localStorage.setItem("token", loginResult.token); // On va stocker le token dans le localStorage

            window.location.href = "index.html"; // Redirection vers l'accueil
        } else {
            // Si ce n'est pas bon on va afficher un message d'erreur qui avait été mis en display:none
            errorMessage.style.display = "block"; // Afficher le message d'erreur
        }

        // Gestion des erreurs
    } catch (error) {
        throw new Error(
            "Une erreur s'est produite lors de la récupération des identifiants :",
            error
        );
    }
}

/////////////////////////////////////////////////
/**
 *   Affichage / masquage des icones password
 */
/////////////////////////////////////////////////

// On va écouter le click sur l'icone qui affiche le password
eye.addEventListener("click", () => {
    eye.style.display = "none"; // On désactive le bouton afficher

    eyeOff.style.display = "block"; // On fait apparaitre le bouton masquer

    passwordField.type = "text"; // On transforme en type "text" pour afficher le password
});

// Puis on inverse
eyeOff.addEventListener("click", () => {
    eyeOff.style.display = "none";

    eye.style.display = "block";

    passwordField.type = "password";
});
