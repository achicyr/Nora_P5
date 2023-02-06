console.log("conecté")
// grace a urlsearchparams je recuperl'id du produit selectionné afin de l'affichez 
//sur la page produit sans avoir a passer par le localstorage 
const url_id = window.location.search;
const urlsearchparams = new URLSearchParams(url_id);


//recuperation de l'id
const theid = urlsearchparams.get('id');




// je recupere les element de l'api mais cette fois ci uniqquement celle selectionné
fetch(`http://localhost:3000/api/products/${theid}`)

  .then(resp => resp.json())
  .then((resp) => {
    //dans cette promise je recupere les element telsque l'image ,le nom , le price
    //afin de les afichez sur ma page produit et cette fois ci graçe a innerhtml 
    const item__img = document.querySelector('.item__img')

    item__img.innerHTML = `<img src="${resp.imageUrl}" alt="${resp.altTxt}"></img>`

    title.innerHTML = `${resp.name}`
    price.innerHTML = `${resp.price}`
    description.innerHTML = `${resp.description}`

    //je boucle avec de recuperer chaque couleur de chaque produit
    for (a of resp.colors) {

      colors.innerHTML += `<option value="${a}">${a}</option>`
    }




  });//fermeture de (then) la reponse fetch



// Au click je stock dans le localstorage 

const addTocart = document.getElementById('addToCart')
// grace a addeventlistener au click sur mon bouton je recuper les valeur de mes input qui me permetra
// de creer un localstorage contenant mes produit selectionnés
addTocart.addEventListener('click', function () {

  const colors = document.getElementById('colors').value;
  const quantity = document.getElementById('quantity').value;

  // je creer une variable contenant mon localstorage pou l'instant aucun element y est present 
  const ls = JSON.parse(localStorage.cart || " {} ")

  //je fais une condition qui detecter la quantité inferieur a ce qui est requis ou trop élevé 
  //puis alert selon le cas alert le client
  if (colors == "" || quantity < 0 || quantity > 100) {
    alert('Veuillez ajouter un produit et une couleur ')

  }
  else {
    // je fais une condition grace a la concatenation de l'id et de la couleur je recupere l'element choisi par le client
    if (ls[theid + " " + colors]) {

      //si theid et colors sont bien present je peut avoir la quantité d'un produit 
      //qui sera stocké dans mon localStorage
      ls[theid + " " + colors] = parseInt(ls[theid + " " + colors]) + parseInt(quantity);
      localStorage.cart = JSON.stringify(ls)

      const redirect = confirm('votre produit a bien été ajouté au panier.voulez vous allez au panier?')
      if (redirect == true) {
        // grace a location.href je pass a la page suivant
        location.href = "cart.html"
      }

    }
    else {

      ls[theid + " " + colors] = parseInt(quantity);
      localStorage.cart = JSON.stringify(ls)
      const redirect = confirm('votre produit a bien été ajouté au panier.voulez vous allez au panier?')
      if (redirect == true) {
        location.href = "cart.html"
      }
    }

  }
});//fermeture addevent addTocart










