const url = 'http://localhost:3000/api/cameras/';

getIdFromParsedUrl = () => {
    const url = window.location.href;
    const params = window.location.search.split('=');
    const id = params[1];
    return id;
};
// utiliser URLsearchparams()

// créer fichier config.js et mettre l'url

// utiliser l'id en paramêtre de callCameraApiWithId
callCameraApiWithId = () => {
    return new Promise((resolve) => {
        const id = getIdFromParsedUrl();
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
        }
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

async function getCameraDetails() {
    const cameraDetails = callCameraApiWithId();
    return cameraDetails;
}

async function buildCameraCard(cameraDetails) {
    // utiliser createTag() pour lignes 48 à 75
    let cameraCard = document.getElementById("cameraCard");
    let productContent = document.createElement("section");
    let productImg= document.createElement("div");
    let productElement = document.createElement("div");
    let productPic = document.createElement("img");
    let productName = document.createElement("h2");
    let productPrice = document.createElement("p");
    let productDescription = document.createElement("p");
    let optionsElements = document.createElement("p");
    let productOptions = document.createElement("label");
    let optionsSelector = document.createElement("select");
    let addToCartButton = document.createElement("button");

     /*Add atributes to HTML balises */
    productContent.setAttribute("class", "product_content");
    productImg.setAttribute("class", "product_img_div");
    productPic.setAttribute("class", "product_img");
    productPic.setAttribute("alt", "Camera picture");
    productElement.setAttribute("class", "product_element");
    productName.setAttribute("class", "product_name");
    productDescription.setAttribute("class", "product_desc");
    productPrice.setAttribute("class", "product_price");
    optionsElements.setAttribute("class", "options_elements");
    productOptions.setAttribute("for", "lenses_options");
    optionsSelector.setAttribute("name", "lenses");
    optionsSelector.setAttribute("id", "lenses_options");
    addToCartButton.setAttribute("class", "add-btn");
    addToCartButton.textContent = "Add to cart";

    /* HTML elements design */
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
    // productElement.appendChild(productAction);
    productElement.appendChild(addToCartButton);

    /* HTML balises content */
    // productAction.setAttribute("href", "basket.html");
    // productAction.textContent = "Add to cart";
    productOptions.textContent = "Choose your lense:";

    for (const [key, detail] of Object.entries(await cameraDetails)) {
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

        // checker localstorage pour enregistrer les infos dans le panier

        // envoyer dans localstorage les infos du panier en string

        // récupérer les infos du localstorage et les transformer en tableau
    };

    addToCartButton.addEventListener("click", () => {
        // console.log(optionsSelector.value);
        let cart = [];
        if (localStorage.getItem("cart") !== null) {
            cart = JSON.parse(localStorage.getItem("cart"));
            // vérifier que le produit n'est pas déjà dans cart
            // si déjà dans cart, +1 quantité
            // si pas dans cart, faire cart.push(produit)
        } else {
            // faire cart.push(produit)
        }
        localStorage.setItem("cart", JSON.stringify(cart));  
    })
}

function createTag(tagName, attributes) {
    const element = document.createElement(tagName)
    // element.className = className
    for (attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    return element
}

buildCameraCard(getCameraDetails());