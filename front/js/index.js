console.log('connecté')
// je recupere les donneé de l'api
fetch("http://localhost:3000/api/products")

  //je converti ma repnse en JSON
  .then(resp => resp.json())

  // Voici ma reponse a savoir les different produit 
  .then(products => {
    //  console.log(products)

    //je fais une  boucle qui affichera chaque produit et grace à l'interpolation j'affiche tout mes produit sur la page  
    products.forEach((item) => {
      document.querySelector(".items").innerHTML += `<a href="./product.html?id=${item._id}">
      <article>
        <img src="${item.imageUrl} " alt="${item.altTxt}">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
                  `

    })
  })
  .catch(error=>{console.error('PUT YOUR CODE HERE IN CASE OF FAILLURE .',error)})
  .finally (()=>{console.log("FINAL MESSAGE")})



