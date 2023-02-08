
//Si l'URL de votre page est https://example.com/?name=Jonathan%20Smith&age=18, vous pouvez analyser les paramètres nameet en utilisant :age

let params = (new URL(document.location)).searchParams;
let orderId = params.get('orderId'); 
document.getElementById('orderId').innerHTML=orderId
if(orderId){
    delete localStorage.cart;
}