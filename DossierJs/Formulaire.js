
// Récupération des éléments
const popup = document.getElementById("popupForm");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.querySelector(".close");


 // Contenu du pop-up 
export function afficherPopUp() {
  document.querySelector("#addSiteForm").innerHTML =
  ` <label for="siteName">Nom du site :</label>
      <input type="text" id="siteName" name="siteName" required>

      <label for="url">URL :</label>
      <input type="url" id="url" name="url" required>

      <label for="category">Catégorie :</label>
      <select id="category" name="category" required>
        <option value="">Sélectionner</option>
        <option value="Technologie">Technologie</option>
        <option value="Éducation">Éducation</option>
        <option value="Santé">Santé</option>
        <option value="Divertissement">Divertissement</option>  
      </select>
      <label for="description">Description :</label>
      <textarea id="description" name="description" rows="4"></textarea>

      <button type="submit" class="btn">Envoyer</button>`;
}

// Ouvrir le pop-up
export function popupMovements() {
openBtn.onclick = function () {
  popup.style.display = "block";
}

// Fermer le pop-up
closeBtn.onclick = function () {
  popup.style.display = "none";
}

// Fermer si on clique en dehors
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
}