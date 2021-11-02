// ------------------------------- PANIER.HTML --------------------------//
var header = document.querySelector('header');
var section = document.querySelector('section');
var panier = JSON.parse(localStorage.getItem('panier'));
var boutonPanier = document.getElementById('boutonValiderPanier');
var prixPanier = localStorage.getItem("total");


//affichage du bouton "panier vide" si le panier contient 0, sinon possibilité de valider son panier pour passer une commande//
if (prixPanier==0){
    var div = document.createElement("div");
    div.classList.add("CartPage-ticket-cartSubmit");
    div.textContent="Votre panier est vide.";
    boutonPanier.appendChild(div);     
          } else {
              boutonPanier.innerHTML=
                ` <a href="commande.html">  
                      <div class="CartPage-ticket-cartSubmit"> 
                        <span class="btn_checked">
                            <i class="fas fa-check-circle"></i>
                        </span>
                        Je valide mon panier
                      </div>
                  </a>

                  <a href ="index.html">
                      <div class ="ViderPanier" onclick="(function(){
                                    if (confirm('Etes-vous sûr de vouloir vider votre panier ?')) ViderPanier();
                                    })()"> 
                                <i class="far fa-trash-alt"></i> Vider mon panier
                      </div>
            
                  </a>
              `
};
               
if (panier.lenght==0){
        section.innerHTML = "Panier vide";
    }
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
    }
};


          
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
        
};



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
};



function ViderPanier() {
      localStorage.setItem('panier',JSON.stringify([]));
      localStorage.setItem('total', 0);
      window.location = 'index.html';
  };

// ------------------------------- FIN PANIER.html --------------------------//