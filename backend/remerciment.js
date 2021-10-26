//récupérer la commande dans le localstorage + n°ID de la commande//

var commande = JSON.parse(localStorage.getItem('commande'));
var numero = commande.orderId;
document.getElementById("identifiantCommande").textContent = numero;