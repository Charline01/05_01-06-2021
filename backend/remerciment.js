//récupérer la commande dans le localstorage + n°ID de la commande//
var commande = localStorage.getItem('commande');
document.getElementById("identifiantCommande").textContent = commande;