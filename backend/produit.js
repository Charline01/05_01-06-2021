// ------------------------------- PRODUIT.HTML --------------------------//

// mettre le localstorage à zéro si le panier est vide
if(localStorage.getItem('panier')==null){
    var panier = [];
    localStorage.setItem('panier', JSON.stringify(panier));
    localStorage.setItem('total', 0);
    }

var header = document.querySelector('header');
var section = document.querySelector('section');
var colors = document.querySelector('colors');

//extration et paramètre de l'url
var url = window.location.href.split("=");
var id = url[1];

chercherapi ('http://127.0.0.1:3000/api/teddies/'+ id);

//api/furniture/5ceiocdnjdc8d9959
function chercherapi(requestURL){
        var request = new XMLHttpRequest();
        
        request.open('GET', requestURL);

        request.responseType = 'json';
        request.send();

        request.onload = function() {
            var teddies = request.response;
            showTeddies(teddies);
        }
}

//addition d'un autre atricle dans le panier//
function ajouterPanier(id, prix){
        var panier = JSON.parse(localStorage.getItem("panier"));
        panier.push(id);
        localStorage.setItem('panier', JSON.stringify(panier));

        var total = parseInt(localStorage.getItem('total')) + parseInt(prix);
        localStorage.setItem('total', total);
    };

//afficher les informations du produit sélectionné//
function showTeddies(teddies) {
        //création des éléments html//
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var monBoutonPanier = document.createElement('button');
        var personnalisation = document.createElement('select');
        var myImage = document.createElement('img');
        
        // liste des couleurs
        let colors = teddies.colors;
        //affichage des options de couleurs
        for(let i = 0; i<colors.length; i ++){
            let option = document.createElement('option');
                option.textContent = colors[i];
                personnalisation.appendChild(option);
        }

        myH2.textContent = teddies.name;
        myPara1.textContent = 'Prix : ' + (teddies.price/100) + ' €';
        myPara2.textContent = 'Description : ' + teddies.description;
        myImage.src = teddies.imageUrl;
        monBoutonPanier.textContent = '🛒 '+ 'Ajouter au panier';
                monBoutonPanier.classList.add("boutonpanier");
                //changement d'apparence du bouton "Ajouter au panier" au clic pour "Article ajouté//
                monBoutonPanier.addEventListener("click",function(){
                    ajouterPanier(teddies._id, teddies.price/100);
                    this.textContent = "✔️ Article ajouté";
                    monBoutonPanier.style.backgroundColor = "#a293f5";
                });

        //faire apparaitre les élements créés dans le code html//
        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myImage);

        section.appendChild(myArticle);

        myArticle.appendChild(personnalisation);
        myArticle.appendChild(monBoutonPanier);
      
}

// ------------------------------- FIN PRODUIT.html --------------------------//