// ------------------------------- PASSER LA COMMANDE --------------------------//


// récupérer les informations du panier et les enregistrer dans le localstorage // 
const sendBtn = document.querySelector('#boutonCommander');
sendBtn.addEventListener('click', (e) =>{
  e.preventDefault()
  validerFormulaire()
})



function envoyerFormulaire(contact) {
    
    var products = JSON.parse(localStorage.getItem("panier"));

                fetch('http://127.0.0.1:3000/api/teddies/order', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                                      },
                                      body:  JSON.stringify({
                                      contact,
                                      products
                                    })
                            }).then((response) => {
                              if (response.ok === true){
                                return response.json()
                              }else{
                                alert("Problème requete")
                              } 
                            })
                              .then((data) => {
                                console.log(data);
                                if (data.orderId){
                                  localStorage.setItem('commande', (data.orderId));
                                  // calcul du montant total
                                  let products = data.products;
                                  let total = 0;
                                  for(product of products){
                                    total = total + product.price/100;
                                  }
                                  localStorage.setItem('total', total);
                                  window.location = "remerciement.html";    
                              }                             
                              })
                              .catch(error => {
                                console.log(error);
                                alert("Une erreur est survenue.")
                               })

                }


//Enregistrer les informations du formulaire dans le localstorage//
function validerFormulaire(){
      var prenom = document.getElementById("firstName").value;
      var nom = document.getElementById("lastName").value;
      var adresse = document.getElementById("address").value;
      var ville = document.getElementById("city").value;
      var email = document.getElementById("email").value;
                
                
      //Vérification des regex du le formulaire
      var regexNomPrenom = /[a-z ,.'-]+$/i;
      var regexAdresse = /[a-z ,.'-]+$/i;
      var regexVille = /([A-Za-z]{3,})/;
      var regexMail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
      
      
      if (regexNomPrenom.exec(nom) == null) {
          nom = "";
      }
      
      if (regexNomPrenom.exec(prenom) == null) {
          prenom = "";
        
      }
      if (regexAdresse.exec(adresse) == null) {
          adresse = "";
        
      }
      
      if (regexVille.exec(ville) == null) {
          ville = "";
      
      }
      if (regexMail.exec(email) == null) {
          email= "";
        
      }
        
      var prixTotal = prixTotalPeluche();
         

      if (prixTotal !=0 && prenom != "" && nom !="" && adresse!="" && ville !="" && email !=""){
        var contact = {
            firstName: prenom, 
            lastName: nom,
            address: adresse,
            city: ville,
            email: email
            };
  
            localStorage.setItem("contact", contact);
            localStorage.setItem("firstName", prenom);
            localStorage.setItem("lastName", nom);
            localStorage.setItem("address", adresse);
            localStorage.setItem("city", ville);
            localStorage.setItem("email", email);
            
            envoyerFormulaire(contact);
      }

     else alert("Veuillez vérifier tous les champs du formulaire");
 }

  
 function prixPeluche(requestURL) {

  var request = new XMLHttpRequest();

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  request.onload = function() {
      var teddies = request.response;
      console.log(teddies);
     return teddies.price/100;
      }
}

function prixTotalPeluche(){
  var panier = JSON.parse(localStorage.getItem("panier"));
  var prix = 0;
  panier.forEach(id => {
    prix += prixPeluche("http://127.0.0.1:3000/api/teddies/" + id)
    });
  return prix;
}


// ------------------------------- PANIER.HTML --------------------------//
var header = document.querySelector('header');
                    var section = document.querySelector('section');
                    var panier = JSON.parse(localStorage.getItem('panier'));
                    var boutonPanier = document.getElementById('boutonCommander');
                    var prixPanier = localStorage.getItem("total");

                    


                  //affichage du bouton panier vide si le panier contient 0, sinon possibilité de valider son panier pour passer une commande//
                   if (prixPanier==0){
                    var div = document.createElement("div");
                    div.classList.add("CartPage-ticket-cartSubmit");
                    div.textContent="Votre panier est vide.";
                    boutonPanier.appendChild(div);
                             
                   } else {
                     boutonPanier.innerHTML=` <a href="remerciement.html">  
                                                    <div class="CartPage-ticket-cartSubmit"> 
                                                      <span class="btn_checked">
                                                          <i class="fas fa-check-circle"></i>
                                                      </span> 
                                                      Je valide ma commande
                                                    </div>
                                                </a>

                                              <a href ="index.html">
                                                    <div class ="ViderPanier" onclick="(function(){
                                                                            if (confirm('Etes-vous sur de vouloir vider votre panier ?')) ViderPanier();
                                                                             })()"> 
                                                                        <i class="far fa-trash-alt"></i> Vider mon panier
                                                    </div>
                                              </a>
                                            `
                  }

               
if (panier.lenght==0){
    section.innerHTML = "Panier vide";
}

let totalAmount = 0;

panier.forEach(id => {
    chercherapi("http://127.0.0.1:3000/api/teddies/" + id);
});
    
            

function chercherapi(requestURL) {
    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var teddies = request.response;
        showTeddies(teddies);
        getTotal(teddies);
    }
}


// Calculer le montant total de la commande
function getTotal(teddies){
  totalAmount = totalAmount + teddies.price/100;
  document.getElementById("prixTotal").textContent = totalAmount;
}


          
// retourner les peluches ajoutées//
             function showTeddies(teddies) {
               

                var myArticle = document.createElement('article');
                var myH2 = document.createElement('h2');
                var myPara1 = document.createElement('p');
                var myPara2 = document.createElement('p');
                var myImage = document.createElement('img');
                var boutonSuppr = document.createElement ('div');
                

                myH2.textContent = teddies.name;
                myPara1.textContent = 'Prix : ' + teddies.price/100 + ' €';
                myPara2.textContent = 'Description : ' + teddies.description;
                myImage.src = teddies.imageUrl;
                boutonSuppr.textContent = "❌ Supprimer l'article";
                boutonSuppr.classList.add("boutonSuppr");

                
                myArticle.appendChild(myH2);
                myArticle.appendChild(myPara1);
                myArticle.appendChild(myPara2);
                myArticle.appendChild(myImage);
                myArticle.appendChild(boutonSuppr);

               
                section.appendChild(myArticle);
            
        
                //Supprimer les articles dans le panier dans le localstorage//
                boutonSuppr.addEventListener("click", function(){
                  var succes = supprimerPanier(teddies._id, teddies.price/100);
                event.preventDefault();
                if (succes) alert("Ce produit a été supprimé du panier");
                window.location.href = "panier.html";
                });
        
    }



    //supprimer peluches du panier//
              function supprimerPanier (id, prix){
                var panier = JSON.parse(localStorage.getItem('panier'));
                let i = 0;
                var trouver = false;

                while(i < panier.length && trouver == false) {
                    if (id == panier[i]){
                      if (confirm("Etes-vous sûr de vouloir supprimer cet article référence n° " + id + " ?")){
                        panier.splice(i,1);
                        localStorage.setItem('panier', JSON.stringify(panier));

                        var total = parseInt(localStorage.getItem('total')) - parseInt(prix);
                        localStorage.setItem('total', total);
                      }
                      trouver = true;
                    }
                    else i++;
                  }
                return trouver;
                }
                

function ViderPanier() {
  localStorage.setItem('panier',JSON.stringify([]));
    localStorage.setItem('total', 0);
    window.location = 'index.html';
}

// ------------------------------- FIN PANIER.html --------------------------//