// ------------------------------- INDEX.html --------------------------//
var header = document.querySelector('header');
var section = document.querySelector('section');
        
chercherapi ('http://127.0.0.1:3000/api/teddies','teddies');
   

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


//afficher les infos des peluches//
function showTeddies(jsonObj) {
        jsonObj.forEach( teddies => {
                var myArticle = document.createElement('article');
                var myH2 = document.createElement('h2');
                var myPara1 = document.createElement('p');
                var myPara2 = document.createElement('p');
                var myImage = document.createElement('img');
                var Voir = document.createElement('a');
                var ajoutFavori = document.createElement('p');
                var coeurlike = document.createElement ('span');
                var boutonVoir = document.createElement ('div');                 

                myH2.textContent = teddies.name;
                
                myPara1.textContent = 'Prix : ' + (teddies.price/100) + ' €';
                myPara2.textContent = 'Description : ' + teddies.description;
                myImage.src = teddies.imageUrl;
                Voir.href = 'produit.html?id='+teddies._id;
                Voir.innerHTML = ` <div class="boutonVoir">Voir
                    </div>
                `;
                coeurlike.innerHTML = `<div class="coeur_like">
                                        <span class="fa-stack">
                                        <i class="far  fa-heart" ></i>
                                        <i class="far  fa-heart fa-gradient"></i>
                                        </span>
                                        </div>
                                        `;


                myArticle.appendChild(myH2);
                myArticle.appendChild(myPara1);
                myArticle.appendChild(myPara2);
                myArticle.appendChild(myImage);
                myArticle.appendChild(Voir);

                section.appendChild(myArticle);

                myArticle.appendChild(ajoutFavori);
                
                myH2.appendChild(coeurlike);
                myArticle.appendChild(boutonVoir);
                boutonVoir.appendChild(Voir);

        })
};

// ------------------------------- FIN INDEX.html --------------------------//