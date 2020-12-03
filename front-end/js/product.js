const url = 'http://test-api.io:3000/api/cameras/';

getIdFromParsedUrl = () => {
    const url = window.location.href;
    const params = window.location.search.split('=');
    const id = params[1];
    return id;
};

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
            console.log("Connecté");
        } else {
            console.log("Non connecté");
        }
        };
        try {
        request.send();
        } catch (e) {
        console.error(e);
        } finally {
        }
    });
};

async function getCameraDetails() {
    const cameraDetails = callCameraApiWithId();
    console.log(cameraDetails);
    return cameraDetails;
}

async function buildCameraCard(cameraDetails) {
    let cameraCard = document.getElementById("cameraCard");

    for (const [key, detail] of Object.entries(await cameraDetails)) {
        console.log(`${key}: ${detail}`);
        console.log(detail.name);
        let productContent = document.createElement("section");
        let productImg= document.createElement("div");
        let productElement = document.createElement("div");
        let productPic = document.createElement("img");
        let productName = document.createElement("h2");
        let productPrice = document.createElement("p");
        let productAction = document.createElement("a");
        let addToCartButton = document.createElement("btn");
    
        /*Add atributes to HTML balises */
        productContent.setAttribute("class", "product_content");
        productImg.setAttribute("class", "product_img_div");
        productPic.setAttribute("src", detail.imageUrl);
        productPic.setAttribute("class", "product_img");
        productPic.setAttribute("alt", "Camera picture");
        productElement.setAttribute("class", "product_element");
        productName.setAttribute("class", "product_name");
        productPrice.setAttribute("class", "product_price");
        productAction.setAttribute("href", "product.html?id=" + detail._id);
        addToCartButton.setAttribute("class", "add-btn");
    
        /* HTML elements design */
        cameraCard.appendChild(productContent);
        productContent.appendChild(productImg);
        productImg.appendChild(productPic);
        productContent.appendChild(productElement);
        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(productAction);
        productAction.appendChild(addToCartButton);
    
        /* HTML balises content */
        productName.textContent = detail.name;
        productPrice.textContent = detail.price / 100 + " euros";
        productAction.textContent = "Add to cart";
    };

    // Array.from(await cameraDetails).forEach((detail) => {
    
    // });
}

buildCameraCard(getCameraDetails());