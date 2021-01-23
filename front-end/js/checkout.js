const params = new URLSearchParams(window.location.search);
const orderNumber = params.get('order');
const price = params.get('price');

function displayOrderNumberAndPrice() {
    const checkoutDiv = document.getElementById("checkoutCard");
    const orderNumberDisplay = createTag("p", "class", "order");
    orderNumberDisplay.innerHTML = `Thank you for choosing Orinoco, your order number is #${orderNumber}`;
    checkoutDiv.appendChild(orderNumberDisplay);
    const priceDisplay = createTag("p", "class", "price");
    priceDisplay.innerHTML = `You paid: ${price}$`;
    checkoutDiv.appendChild(priceDisplay);
}

function displayNoOrder() {
    const checkoutDiv = document.getElementById("checkoutCard");
    const noOrderDisplay = createTag("p", "class", "order");
    noOrderDisplay.innerHTML = "Your basket is empty, check our products and find your dream camera :)";
    checkoutDiv.appendChild(noOrderDisplay);
}

(price === '0') ? displayNoOrder() : displayOrderNumberAndPrice() 
