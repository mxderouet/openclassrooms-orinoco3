getIdFromParsedUrl = () => {
    const url = window.location.href;
    const searchParams = new URL(url).search;
    const id = searchParams.split("=")[1];
    return id;
};

callCameraApiWithId = (id) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.open("GET", `${url}${id}`);
        console.log(`${url}${id}`);
        request.setRequestHeader('Content-Type', 'text/plain');
        request.onreadystatechange = function () {
        if (
            this.readyState == XMLHttpRequest.DONE &&
            this.status >= 200 &&
            this.status < 400
        ) {
            resolve(JSON.parse(this.responseText));
            console.log("Connected");
        } // add reject promise
        };
        try {
        request.send();
        } catch (e) {
        console.error(e);
        console.log("Not connected");
        } finally {
        }
    });
};

function pushToCart(cart, cameraDetails, lense) {
    cart.push({ ...cameraDetails, lense });
}

async function buildCameraCard() {
    const cameraDetails = await callCameraApiWithId(getIdFromParsedUrl());
    /* HTML structure design */
    const header = document.getElementById("navbar");
    const checkoutButton = createTag("button", "class", "checkout-btn");
    checkoutButton.textContent = "Checkout to basket";
    let cameraCard = document.getElementById("cameraCard");
    const productContent = createTag("section", "class", "product_content");
    const productImg = createTag("div", "class", "product_img_div");
    const productElement = createTag("div", "class", "product_element");
    const productPic = createTag("img", "class", "product_img");
    productPic.setAttribute("alt", "Camera picture");
    const productName = createTag("h2", "class", "product_name");
    const productPrice = createTag("p", "class", "product_price");
    const productDescription = createTag("p", "class", "product_desc");
    const optionsElements = createTag("p", "class", "options_elements");
    const productOptions = createTag("label", "for", "lenses_options");
    const optionsSelector = createTag("select", "name", "lenses");
    optionsSelector.setAttribute("name", "lenses");
    const addToCartButton = createTag("button", "class", "add-btn");
    addToCartButton.textContent = "Add to cart";

    /* HTML elements design */
    header.appendChild(checkoutButton);
    cameraCard.appendChild(productContent);
    productContent.appendChild(productImg);
    productImg.appendChild(productPic);
    productContent.appendChild(productElement);
    productElement.appendChild(productName);
    productElement.appendChild(productDescription);
    productElement.appendChild(productPrice);
    productElement.appendChild(optionsElements);
    optionsElements.appendChild(productOptions);
    optionsElements.appendChild(optionsSelector);
    productElement.appendChild(addToCartButton);

    /* HTML balises content */
    productOptions.textContent = "Choose your lense:";

    for (const [key, detail] of Object.entries(cameraDetails)) {
        if (key === 'imageUrl') { productPic.setAttribute("src", detail); };
        if (key === 'name') { productName.textContent = detail; };
        if (key === 'description') { productDescription.textContent = detail; };
        if (key === 'price') { productPrice.textContent = (detail / 100).toFixed(2) + " euros"; };
        
        if (key === 'lenses') { 
            for (const lense of detail) {
                let lenseOption = document.createElement("option");
                lenseOption.setAttribute("value", lense);
                lenseOption.textContent = lense;
                optionsSelector.appendChild(lenseOption);
            }
        };
    };

    addToCartButton.addEventListener("click", () => {
        console.log(optionsSelector.value);
        let cart = [];
        if (localStorage.getItem("cart") !== null) {
            cart = JSON.parse(localStorage.getItem("cart"));
            console.log(cameraDetails);
            pushToCart(cart, cameraDetails, optionsSelector.value);
            // cart.push(cameraDetails.productName, cameraDetails.productPrice, optionsSelector.value);
            console.log(cart);
            // if (cart.getItem(cameraDetails)) {
            //     console.log(cart);
            // }
        } else {
            pushToCart(cart, cameraDetails, optionsSelector.value);
            // cart.push("cameraName", optionsSelector.value, 2);
            // faire cart.push(produit)
            // pushToCart(cart, cameraDetails, optionsSelector.value);
        }
        localStorage.setItem("cart", JSON.stringify(cart));  
        console.log(cart);
    })
    checkoutToBasket(checkoutButton);
}

function checkoutToBasket(checkoutButton) {
    checkoutButton.addEventListener("click", () => {
        document.location.href = '/basket.html'; 
    })
}

buildCameraCard();