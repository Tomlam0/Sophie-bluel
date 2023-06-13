/////////////////////////////////////////////////
/**
 * Variable de connexion valide
 */
/////////////////////////////////////////////////

const validUserId = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
};

/////////////////////////////////////////////////
/**
 * Fonction de login qui fetch l'API
 */
/////////////////////////////////////////////////

async function login() {
  try {
    // la variable va chercher dans l'API si les éléments de connexion sont valides
    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        email: "",
        password: "",
      },
    });

    const loginResult = await loginResponse.json(); // Attente de la conversion en JSON

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
 *  Envoi du formulaire de connexion
 */
/////////////////////////////////////////////////

// On va utiliser le paramètre submit, c'est donc le formulaire entier qui doit être pris en compte
let loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (event) => {
  // Désactivation du comportement par défaut du navigateur
  event.preventDefault();

  // On va chercher les valeurs des champs remplis
  let emailInput = document.getElementById("email").value;
  let passwordInput = document.getElementById("password").value;

  // On va vérifier si les champs remplis sont valides
  if (
    emailInput === validUserId.email &&
    passwordInput === validUserId.password
  ) {
    // Si les paramètres de connexion sont valides
    window.location.href = "index_edit.html"; // Redirection vers l'accueil en version _edit

    // ----------------------------- //
  } else {
    // Si ce n'est pas bon on va afficher un message d'erreur qui a été mis en display:none
    let errorMessage = document.querySelector(".error-message"); // On va récupérer le message d'erreur dans le DOM

    errorMessage.style.display = "block"; // Afficher le message d'erreur
  }
});
