getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
}

getLocalStorage();

// envoyer requête POST à l'API avec {{ contact}, [ids_produits] }
// supprimer desc, imgUrl & lenses du panier avec delete product.name;

function serializeFormAndBasket() {
    const basket = JSON.parse(localStorage.getItem("cart"));
}

function sendFormButton() {
    const sendFormButton = createTag("input", "type", "submit");
    sendFormButton.value = "Send form";
    sendFormButton.addEventListener("click", () => {
        serializeFormAndBasket();
    })
    return sendFormButton;
}

function buildForm() {
    const form = document.getElementById("formCard");
    const formTag = createTag("form", "method", "get");
    const firstnameInput = createTag("input", "name", "firstname");
    const labelFirstname = createTag("label", "for", "firstname");
    firstnameInput.pattern = /^[a-z ,.'-]+$/i;
    firstnameInput.required = true;
    labelFirstname.textContent = "Firstname:";

    const lastnameInput = createTag("input", "name", "lastname");
    const labelLastname = createTag("label", "for", "lastname");
    lastnameInput.pattern = /^[a-z ,.'-]+$/i;
    lastnameInput.required = true;
    labelLastname.textContent = "Lastname:";

    const addressInput = createTag("input", "name", "address");
    const labelAddress = createTag("label", "for", "address");
    addressInput.pattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    addressInput.required = true;
    labelAddress.textContent = "Address:";

    const cityInput = createTag("input", "name", "city");
    const labelCity = createTag("label", "for", "city");
    cityInput.pattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    cityInput.required = true;
    labelCity.textContent = "City:";

    const emailInput = createTag("input", "name", "email");
    const labelEmail = createTag("label", "for", "email");
    emailInput.pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
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
    console.log(basket);
    console.log(typeof(basket));
    basket.splice(index, 1);
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
        card.appendChild(productText);
        productText.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            deleteItem(index);
            productText.removeChild(deleteButton);
            card.removeChild(productText);
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