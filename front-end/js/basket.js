getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
}

getLocalStorage();

// envoyer requête POST à l'API avec {{ contact}, [ids_produits] }

function serializeFormAndBasket() {
    const apiMessage = {
        contact: { 
            firstName: document.getElementById().value,
            lastName: document.getElementById().value,
            address: document.getElementById().value,
            city: document.getElementById().value,
            email: document.getElementById().value
        },
        products: []
    }
    const basket = JSON.parse(localStorage.getItem("cart"));
    // boucle sur le basket pour alimenter le panier
    for (item in basket) {
        products.push(item._id);
    }
    // apiMessage.products.push(id)
    apiMessage = JSON.stringify(apiMessage);
    return apiMessage;
}

async function sendToApi(data) {
    // sendToApi avec POST

    const orderNumber = 'ApiResponse';
    // envoyer numbero de commande & total dans URL pour page confirmation
    // afficher numero de commande & total sur la page confirmation
    // vider localStorage
    return orderNumber;
}

async function sendFormButton() {
    const sendFormButton = createTag("input", "type", "submit");
    sendFormButton.value = "Send form";
    sendFormButton.addEventListener("click", () => {
        const data = serializeFormAndBasket();
        const orderNumber = await sendToApi(data);
        console.log(orderNumber);
    })
    return sendFormButton;
}

function buildForm() {
    const form = document.getElementById("formCard");
    const formTag = createTag("form", "method", "get");
    const firstnameInput = createTag("input", "name", "firstname");
    const labelFirstname = createTag("label", "for", "firstname");
    firstnameInput.setAttribute("pattern", "^[a-zA-Z ,.'-]+$");
    firstnameInput.required = true;
    labelFirstname.textContent = "Firstname:";

    const lastnameInput = createTag("input", "name", "lastname");
    const labelLastname = createTag("label", "for", "lastname");
    lastnameInput.setAttribute("pattern", "^[a-zA-Z ,.'-]+$");
    lastnameInput.required = true;
    labelLastname.textContent = "Lastname:";

    const addressInput = createTag("input", "name", "address");
    const labelAddress = createTag("label", "for", "address");
    addressInput.setAttribute("pattern", "^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
    addressInput.required = true;
    labelAddress.textContent = "Address:";

    const cityInput = createTag("input", "name", "city");
    const labelCity = createTag("label", "for", "city");
    cityInput.setAttribute("pattern", "/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
    cityInput.required = true;
    labelCity.textContent = "City:";

    const emailInput = createTag("input", "name", "email");
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

// ENVOYER ID & LENSE pour trouver l'index puis splice()
function deleteItem(index) {
    let basket = [];
    basket = JSON.parse(localStorage.getItem("cart"));
    console.log(basket);
    console.log(typeof(basket));
    console.log(index);
    basket.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(basket));
    console.log(basket);
}

function buildBasket(localStorage) {
    console.log(localStorage);
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