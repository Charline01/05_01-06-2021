// ------------------------------- COMMANDE.HTML --------------------------//



// const { response } = require("express");

// récupérer les informations du panier et les enregistrer dans le localstorage // 


const sendBtn = document.querySelector('#boutonCommander');
sendBtn.addEventListener('click', (e) =>{
  e.preventDefault()
  validerFormulaire()
})



function envoyerFormulaire() {
    var panier = JSON.parse(localStorage.getItem('panier'));
    
  
    var products = ""; 
    for (p = 0; p<panier.length;p++) {
    products += "&products[]=" + panier[p];
    }
  
  

        alert("test oui");
        var nom = localStorage.getItem('firstName');
        var prenom = localStorage.getItem('lastName');
        var adresse = localStorage.getItem('address');
        var ville = localStorage.getItem('city');
        var email = localStorage.getItem('email');


        products = JSON.parse(localStorage.getItem("panier"));

                fetch('http://127.0.0.1:3000/api/teddies/order', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                                      },
                                      body:  JSON.stringify({
                                        contact: {
                                        firstName: nom, 
                                        lastName: prenom,
                                        address: adresse,
                                        city: ville,
                                        email: email
                                                  },
                                      products
                                    })
                            }).then((response) => {return response.json()
                            })
                              .then((data) => {
                                  console.log(data);
                                  localStorage.setItem('commande', (data.orderId))
                              })
                                .catch(error => {
                                  console.log(error)
                                  alert("Problème requete")
                                })
                          window.location = "remerciement.html";     
                    };
                  
                    
  
                  //Enregistrer les informations du formulaire dans le localstorage//
                  function validerFormulaire(){
                      var prenom = document.getElementById("firstName").value;
                      var nom = document.getElementById("lastName").value;
                      var adresse = document.getElementById("address").value;
                      var ville = document.getElementById("city").value;
                      var email = document.getElementById("email").value;
                  
                  
                            //Vérification des regex du le formulaire
                            var regexNomPrenom = /^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,20})$/;
                            var regexAdresse = /^([0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50})$/;
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
                            
                            
                  
                  
                  
                                  if (localStorage.getItem("total")!=0 && prenom != "" && nom !="" && adresse!="" && ville !="" && email !=""){
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
                                        console.log(contact);
                                        envoyerFormulaire();
                    }

       else alert("Veuillez vérifier tous les champs du formulaire");
   }