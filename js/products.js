const products = [

{
    id:1,
    name:"Classic Yogo Fura",
    price:2000,
    image:"images/yogo1.jpg"
},

{
    id:2,
    name:"Mango Juice",
    price:1000,
    image:"images/yogo2.jpg"
},

{
    id:3,
    name:"Less suger Yogo Fura",
    price:2000,
    image:"images/yogo3.jpg"
},
{
    id:4,
    name:"Less Sugar Mango Juice",
    price:1000,
    image:"images/yogo4.jpg"
}
];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayProducts(products);
updateCartCount();

function displayProducts(items){

if(!productContainer) return;

productContainer.innerHTML = "";

items.forEach(product=>{

productContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<h4>₦${product.price}</h4>

<button onclick="addToCart(${product.id})" class="product-btn">

Add To Cart

</button>

</div>

`;

});

}

function addToCart(id){

const product = products.find(item => item.id === id);

const existingProduct = cart.find(item => item.id === id);

if(existingProduct){

existingProduct.quantity++;

}else{

cart.push({

...product,

quantity:1

});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

renderCart();

}

function updateCartCount(){

if(cartCount){

cartCount.textContent = cart.length;

}

}

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value = searchInput.value.toLowerCase();

const filtered = products.filter(product=>{

return product.name.toLowerCase().includes(value);

});

displayProducts(filtered);

});

}

const shoppingCart = document.getElementById("shoppingCart");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

if (openCart && shoppingCart) {
    openCart.addEventListener("click", () => {
        shoppingCart.classList.add("active");
    });
}

if (closeCart && shoppingCart) {
    closeCart.addEventListener("click", () => {
        shoppingCart.classList.remove("active");
    });
}

function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h3>${item.name}</h3>

            <p>₦${item.price}</p>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.id})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">+</button>

            </div>

            <button class="remove-btn" onclick="removeItem(${item.id})">
                Remove
            </button>

        </div>

        `;

    });

    cartTotal.textContent = `₦${total}`;

    localStorage.setItem("cart", JSON.stringify(cart));

}
renderCart();

function increaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity++;

        renderCart();

        updateCartCount();

    }

}

function decreaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity--;

        if(item.quantity <= 0){

            removeItem(id);

            return;

        }

        renderCart();

        updateCartCount();

    }

}

function removeItem(id){

    cart = cart.filter(product => product.id !== id);

    renderCart();

    updateCartCount();

}