getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
}

getLocalStorage();

// afficher panier + formulaire 
// envoyer requête POST à l'API avec {{ contact}, [ids_pruduits] }

function sendFormButton() {
    const sendFormButton = createTag("input", "type", "submit");
    sendFormButton.value = "Send form";
    return sendFormButton;
}

function buildForm() {
    const form = document.getElementById("formCard");
    const formTag = createTag("form", "method", "get");
    const labelFirstname = createTag("label", "for", "firstname");
    labelFirstname.textContent = "Firstname:";
    const firstnameInput = createTag("input", "name", "firstname");

    const lastnameInput = createTag("input", "name", "lastname");
    const labelLastname = createTag("label", "for", "lastname");
    labelLastname.textContent = "Lastname:";

    const addressInput = createTag("input", "name", "address");
    const labelAddress = createTag("label", "for", "address");
    labelAddress.textContent = "Address:";

    const cityInput = createTag("input", "name", "city");
    const labelCity = createTag("label", "for", "city");
    labelCity.textContent = "City:";

    const emailInput = createTag("input", "name", "email");
    const labelEmail = createTag("label", "for", "email");
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

function buildBasket(localStorage) {
    console.log(localStorage);
    for (const detail in localStorage) {
        const card = document.getElementById("basketCard");
        let productText = createTag("p", "class", "product-details");
        productText.textContent = `Product: ${localStorage[detail].name} Price: ${localStorage[detail].price} Lense:${localStorage[detail].lense}`;
        card.appendChild(productText);
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