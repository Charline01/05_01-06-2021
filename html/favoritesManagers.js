/**
 * Gestion des favoris, enregistrement d'un article en favoris, retrait d'un article des favoris et récupération de la liste des favoris
 */
 function monBoutonPanier(articleId){
    let listFavorites = getFavorites();
    listFavorites.push(articleId);
    saveFavorites(listFavorites);
  }

  function removeFavorites(articleId){
      let listFavorites = getFavorites();
      listFavorites = listFavorites.filter(favorites => favorites.articleId);
      saveFavorites(listFavorites);
  }

  function getFavorites(){
    let listFavorites = localStorage.getItem("listFavorites");
    if(listFavorites == null){
      return [];
    }else{
      return JSON.parse(listFavorites);
    }
  }

  function getFavorites(){
      return getFavorites().map(favorites => favorites.articleId);
  }

  function saveFavorites(listFavorites){
    localStorage.setItem("listFavorites",JSON.stringify(listFavorites));
  }
