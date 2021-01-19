getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
}

getLocalStorage();

function serializeFormAndBasket() {
    let apiMessage = {
        contact: { 
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        },
        products: []
    }
    const basket = JSON.parse(localStorage.getItem("cart"));
    let orderPrice = 0;
    for (item of basket) {
        console.log(item);
        apiMessage.products.push(item._id);
        orderPrice += (item.price * item.quantity);
    }
    return { apiMessage, orderPrice }
}

async function sendToApi(data) {
    console.log(data);
    const request = new XMLHttpRequest();
    request.open("POST", postUrl, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
        if (
            this.readyState == XMLHttpRequest.DONE &&
            this.status >= 200 &&
            this.status < 400
        ) {
            const request = JSON.parse(this.responseText);
            const orderNumber = request.orderId;
            const orderPrice = data.orderPrice;
            document.location.href = '/checkout.html#' + orderNumber + '&' + orderPrice;
        }
    };
    request.send(JSON.stringify(data.apiMessage)); 
    let basket = [];
    basket = JSON.parse(localStorage.getItem("cart"));
    basket.length = 0;
    localStorage.setItem("cart", JSON.stringify(basket));
}

function sendFormButton() {
    const formButton = createTag("input", "type", "submit");
    formButton.value = "Send form";
    formButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const data = serializeFormAndBasket();
        const orderNumber = await sendToApi(data);
        console.log(orderNumber);
    })
    return formButton;
}

function buildForm() {
    const form = document.getElementById("formCard");
    const formTag = createTag("form", "method", "get");
    const firstnameInput = createTag("input", "name", "firstname");
    firstnameInput.setAttribute("id", "firstname");
    const labelFirstname = createTag("label", "for", "firstname");
    firstnameInput.setAttribute("pattern", "^[a-zA-Z ,.'-]+$");
    firstnameInput.required = true;
    labelFirstname.textContent = "Firstname:";

    const lastnameInput = createTag("input", "name", "lastname");
    lastnameInput.setAttribute("id", "lastname");
    const labelLastname = createTag("label", "for", "lastname");
    lastnameInput.setAttribute("pattern", "^[a-zA-Z ,.'-]+$");
    lastnameInput.required = true;
    labelLastname.textContent = "Lastname:";

    const addressInput = createTag("input", "name", "address");
    addressInput.setAttribute("id", "address");
    const labelAddress = createTag("label", "for", "address");
    addressInput.setAttribute("pattern", "^[a-zA-Z0-9 ,.'-]+$");
    addressInput.required = true;
    labelAddress.textContent = "Address:";

    const cityInput = createTag("input", "name", "city");
    cityInput.setAttribute("id", "city");
    const labelCity = createTag("label", "for", "city");
    cityInput.setAttribute("pattern", "^[a-zA-Z ,.'-]+$");
    cityInput.required = true;
    labelCity.textContent = "City:";

    const emailInput = createTag("input", "name", "email");
    emailInput.setAttribute("id", "email");
    const labelEmail = createTag("label", "for", "email");
    emailInput.setAttribute("pattern", "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    emailInput.required = true;
    labelEmail.textContent = "Email:";
    
    form.appendChild(formTag);
    formTag.appendChild(labelFirstname);
    formTag.appendChild(firstnameInput);
    formTag.appendChild(labelLastname);
    formTag.appendChild(lastnameInput);
    formTag.appendChild(labelAddress);
    formTag.appendChild(addressInput);
    formTag.appendChild(labelCity);
    formTag.appendChild(cityInput);
    formTag.appendChild(labelEmail);
    formTag.appendChild(emailInput);
    formTag.appendChild(sendFormButton());
}

function deleteItem(index) {
    let basket = [];
    basket = JSON.parse(localStorage.getItem("cart"));
    basket.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(basket));
}

function buildBasket(localStorage) {
    let index = 0;
    for (const detail in localStorage) {
        const card = document.getElementById("basketCard");
        let productText = createTag("p", "class", "product-details");
        productText.setAttribute("data-index", index);
        productText.textContent = `Product: ${localStorage[detail].name} Price: ${localStorage[detail].price} Lense:${localStorage[detail].lense} Quantity: ${localStorage[detail].quantity}`;
        let deleteButton = createTag("button", "class", "delete-btn");
        deleteButton.textContent = "X";
        deleteButton.setAttribute("data-index", index);
        card.appendChild(productText);
        productText.appendChild(deleteButton);
        deleteButton.addEventListener("click", (e) => {
            deleteItem(e.target.getAttribute("data-index"));
            productText.removeChild(deleteButton);
            card.removeChild(productText);
            window.location.reload();
        })
        index ++;
    } 
}

buildForm();

buildBasket(getLocalStorage());

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */