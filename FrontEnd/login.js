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
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    const loginResult = await loginResponse.json(); // Attente de la conversion en JSON

    if (loginResponse.ok) {
      // Si les identifiants sont ok, on identifie la partie token du JSON
      localStorage.setItem("token", loginResult.token); // On va stocker le token dans le localStorage

      window.location.href = "index.html"; // Redirection vers l'accueil
    } else {
      // Si ce n'est pas bon on va afficher un message d'erreur qui avait été mis en display:none
      let errorMessage = document.querySelector(".error-message"); // On va récupérer le message d'erreur dans le DOM

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
 *  Envoi du formulaire de connexion
 */
/////////////////////////////////////////////////

// On va utiliser le paramètre submit, c'est donc le formulaire entier qui doit être pris en compte
let loginForm = document.getElementById("login");

loginForm.addEventListener("submit", (event) => {
  // Désactivation du comportement par défaut du navigateur
  event.preventDefault();

  //Appel de la fonction qui fetch l'API
  login();
});
