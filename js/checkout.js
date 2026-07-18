
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "₦0";
        return;

    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <h3>${item.name}</h3>

            <p>Price: ₦${item.price}</p>

            <p>Quantity: ${item.quantity}</p>

            <p>Subtotal: ₦${subtotal}</p>

            <hr>

        </div>

        `;

    });

    checkoutTotal.textContent = `₦${total}`;

}

displayCheckout();

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const paymentMethod = document.getElementById("paymentMethod").value;
        const receipt = document.getElementById("receipt");

        if (cart.length === 0) {

            alert("Your cart is empty.");
            return;

        }

        if (!fullName || !phone || !address || !city) {

            alert("Please fill in all required fields.");
            return;

        }

        if (paymentMethod === "") {

            alert("Please select a payment method.");
            return;

        }

        if (
            paymentMethod === "Bank Transfer" &&
            receipt.files.length === 0
        ) {

            alert("Please upload your payment receipt.");
            return;

        }

        let orderDetails = "";

cart.forEach(item => {

    orderDetails += `• ${item.name} x${item.quantity} = ₦${item.price * item.quantity}\n`;

});

const total = cart.reduce((sum, item) => {

    return sum + (item.price * item.quantity);

}, 0);

const message = `🛒 *NEW ORDER - Neelas Yogo Fura*

👤 Name: ${fullName}

📞 Phone: ${phone}

📍 Address: ${address}

🏙️ City: ${city}

💳 Payment: ${paymentMethod}

🥛 Order:

${orderDetails}

💰 Total: ₦${total}

Thank you.`;

const whatsappNumber = "2348030774577";

const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

localStorage.removeItem("cart");

cart = [];

window.location.href = whatsappURL;

    });

}
const copyBtn = document.getElementById("copyAccount");

if(copyBtn){

    copyBtn.addEventListener("click", function(){

        const accountNumber =
        document.getElementById("accountNumber").textContent;

        navigator.clipboard.writeText(accountNumber);

        alert("Account number copied successfully!");

    });

}
