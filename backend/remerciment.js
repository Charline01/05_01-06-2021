//récupérer la commande dans le localstorage + n°ID de la commande//

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");


    var commande = localStorage.getItem('commande');
    document.getElementById("identifiantCommande").textContent = commande;

});