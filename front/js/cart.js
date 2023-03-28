//recuperation des donné de l'api puis convertir le format en json
fetch("http://localhost:3000/api/products")
  .then(resp => resp.json())

  .then(products => {
    const ls = JSON.parse(localStorage.cart || "{}")


    const idLs = [];

    for (key in ls) {
      console.log(ls[key]);
    }



    for (item in ls) {
      id = item.split(" ")[0]
      console.log(id);

      color = item.split(" ")[1]
      item = products.filter(el => el._id == id)[0]



      const cart__items = document.getElementById('cart__items');
      cart__items.innerHTML += ` <article class="cart__item" data-id="${item._id}" data-color="${color}">
      <div class="cart__item__img">
        <img src="${item.imageUrl}" alt="${item.altTxt}">
      </div>
      <div class="cart__item__content">
      
        <div class="cart__item__content__description">
      
          <h2>${item.name}</h2>
          <p>${color}</p>
          <p> ${item.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ls[item._id + " " + color]}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article> 
      </section>
     
      `
    }
    let TotalQ = 0
    let TotalPrice = 0
    for (el in ls) {
      // console.log(el);
      let id = el.split(" ")[0]

      let p = products.find((product) => id == product._id)
      console.log(p);
      TotalQ += ls[el]
      TotalPrice += p.price * TotalQ
      //console.log(TotalPrice);

    }

    // document.getElementById("totalQuantity").innerHTML = TotalQ 
    //document.getElementById('totalPrice').innerHTML = TotalPrice
  })


const cart__item = document.querySelector(".cart__item")
let deleteItems = document.querySelectorAll(".deleteItem")
deleteItems.forEach(itemdelete => {


  itemdelete.addEventListener('click', deletequantity)
})
let productsChanges = document.querySelectorAll(".itemQuantity")
productsChanges.forEach(el => {
  el.addEventListener('change', ModifQuantity)
})


function ModifQuantity(e) {

  const newQuantity = parseInt(e.target.value);

  const article = e.target.closest("article")
  const id = article.dataset.id
  const color = article.dataset.color
  const ls = JSON.parse(localStorage.cart)
  console.log(ls);
  let el2 = ls
  el2[id + " " + color] = newQuantity
  localStorage.cart = JSON.stringify(el2)
  TotalQuantity(e)
}

function deletequantity(e) {

  const article = e.target.closest("article")
  const id = article.dataset.id
  const color = article.dataset.color
  const ls = JSON.parse(localStorage.cart)

  delete ls[id + " " + color]

  localStorage.cart = JSON.stringify(ls)
  article.remove()
  // location.href = "cart.html"
}

function TotalQuantity(e) {
  const newQuantity = parseInt(e.target.value);
  const ls = JSON.parse(localStorage.cart)
  console.log(ls);
  let TotalQ = 0
  let TotalPrice = 0

  fetch("http://localhost:3000/api/products")
    .then(resp => resp.json())

    .then(products => {

      for (el in ls) {
        console.log(el);
        let id = el.split(" ")[0]

        let p = products.find((product) => id == product._id)
        console.log(p);
        TotalQ += ls[el]
        TotalPrice += p.price * TotalQ

      }

      document.getElementById("totalQuantity").innerHTML = TotalQ
      document.getElementById('totalPrice').innerHTML = TotalPrice


    })

}





let lastName = document.getElementById("lastName")
let firstName = document.getElementById("firstName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")



//console.log(contact);
let order = document.getElementById("order")
order.addEventListener("submit", function (e) {


  e.preventDefault();
  let cityRegex = /^[a-zA-Z]+$/
  let adressRegex = /^[a-zA-Z0-9 ]+$/
  let errorCaractere = /^[a-zA-Z0-9_]*$/
  let emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const contact = {
    lastName: lastName.value,
    firstName: firstName.value,
    address: address.value,
    city: city.value,
    email: email.value

  }
  //console.log(contact);


  let cityTrue = cityRegex.test(city.value)
  let addressTrue = adressRegex.test(address.value)
  let emailtrue = emailRegex.test(email.value)
  let firstnameTrue = errorCaractere.test(firstName.value)
  let lastnameTrue = errorCaractere.test(lastName.value)

  if (firstnameTrue === true && lastnameTrue === true) {
    alert('Vos coordonées ont été enregistré')
  }
  else {
    document.getElementById("firstNameErrorMsg").innerHTML = "erreur dans le champ de saisie exemple : Doe"
    document.getElementById("lastNameErrorMsg").innerHTML = "erreur dans le champ de saisie exemple : Jhon"
  }
  if (emailtrue === true)
    alert("votre email à bien été confirmé")
  else {
    document.getElementById("emailErrorMsg").innerHTML = "erreur de saisie Email exemple : kanap@yahoo.com"
  }
  if (addressTrue === true) {
    alert("adress confirmé")
  }
  else {
    document.getElementById("addressErrorMsg").innerHTML = "erreur saisie Address exemple : 3 rue dufoux "

  }
  if (cityTrue === true)
    alert("localité confirmé")
  else {
    document.getElementById("cityErrorMsg").innerHTML = "erreur saisie city exemple : Paris "
  }
  if (firstnameTrue === true && lastnameTrue === true && emailtrue === true && addressTrue === true && cityTrue === true) {


    const products = ["107fb5b75607497b96722bda5b504926"]
    fetch("http://localhost:3000/api/products/order", {


      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ contact, products })

    })
      .then(e => {
        return e.json()


      })
      .then(e => {



        console.log(e)
        const orderId = e.orderId
        console.log(orderId);
        location.href = "../html/confirmation.html?orderId=" + orderId
      })
    //
  }

  else {
    alert("Veuillez verifier les champ")
  }

});





