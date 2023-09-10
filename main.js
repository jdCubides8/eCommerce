// Carrito
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//Abrir Carrito
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//Cerrar Carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//Carrito Funcionando
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
//Realizando la Funcion
function ready() {
    //Remover Objetos Carrito
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // CAMBIAR LOS VALORES DE CANTIDADES
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //AÑADIR AL CARRITO
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    //Compra
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

//BOTON DE COMPRA
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');

    var total = document.getElementsByClassName('total-price')[0].innerText;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var adress = document.getElementById('direction').value;
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    message="";
    for (var i = 0; i < cartItemsNames.length; i++) {
        var quantityElement = cartItems.getElementsByClassName('cart-quantity')[i].value;
        message1=(quantityElement + ' ' + cartItemsNames[i].innerText+message);
        message=message1;
    }
    // sendEmail();
    sendEmail(name,email,adress,message);
    // message="Hola";
    // sendEmail(name, email, adress, message);

    alert(`La compra por un valor de ${total} ha sido realizada`);
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
//Remove Items del Carrito
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//CAMBIOS DE CATIDADES
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
//AÑADIR AL CARRITO
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProducttoCart(title, price, productImg);
    updatetotal();
}

function addProducttoCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya esta añadido en el carrito");
            return;
        }

    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remover Carrito-->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}


// //Actualizar el Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;

}

// function sendEmail(name,email,adress,message) {
//     Email.send({
//         Host : "smtp.elasticemail.com",
//         Username : "glorioustastefactory@gmail.com",
//         Password : "A5C4555B9BAF961ED47CD4ED9B4ACD0041BF",
//         To : `${email}, glorioustastefactory@gmail.com`,
//         From : "glorioustastefactory@gmail.com",
//         Subject : ` Gracias ${name} por comprar con nosotros`,
//         Body : `Tu compra de ${message} se ha realizado exitosamente y esperamos entregartelo lo mas pronto posible en la direccion ${adress}.`
//     })
// }
function sendEmail(name,email,adress,message) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "glorioustastefactory@gmail.com",
        Password : "5985EF3CF59C6A0504930EB7EF9DD6626367",
        To : `${email}, allan.torres.c@gmail.com`,
        From : "glorioustastefactory@gmail.com",
        Subject : `Gracias ${name} por comprar con nosotros`,
        Body : `Tu compra de ${message} se ha realizado exitosamente y esperamos entregartelo lo mas pronto posible en la direccion ${adress}.`
    }).then(
    message => alert("Funcionando")
    );
}