const url = 'http://test-api.io:3000/api/cameras/';

callCamerasApi = () => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
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

async function getCameras() {
    const cameras = await callCamerasApi();

    return cameras;
}

async function buildCamerasCards(cameras) {
    let productList = document.getElementById("productList");
    console.log(await cameras);

    // for (camera in await cameras) {
    Array.from(await cameras).forEach((camera) => {
        console.log(camera.name);
        let productContent = document.createElement("section");
        let productImg= document.createElement("div");
        let productElement = document.createElement("div");
        let productPic = document.createElement("img");
        let productName = document.createElement("h3");
        let productPrice = document.createElement("p");
        let productAction = document.createElement("a");
        let addToCartButton = document.createElement("btn");
    
        /*Add atributes to HTML balises */
        productContent.setAttribute("class", "product_content");
        productImg.setAttribute("class", "product_img_div");
        productPic.setAttribute("src", camera.imageUrl);
        productPic.setAttribute("class", "product_img");
        productPic.setAttribute("alt", "Camera picture");
        productElement.setAttribute("class", "product_element");
        productName.setAttribute("class", "product_name");
        productPrice.setAttribute("class", "product_price");
        productAction.setAttribute("href", "product.html?id=" + camera._id);
    
        /* HTML elements design */
        productList.appendChild(productContent);
        productContent.appendChild(productImg);
        productImg.appendChild(productPic);
        productContent.appendChild(productElement);
        productElement.appendChild(productName);
        productElement.appendChild(productPrice);
        productElement.appendChild(productAction);
    
        /* HTML balises content */
        productName.textContent = camera.name;
        productPrice.textContent = camera.price / 100 + " euros";
        productAction.textContent = "Learn more";
    });
}

buildCamerasCards(getCameras());