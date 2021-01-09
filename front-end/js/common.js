const url = 'http://localhost:3000/api/cameras/';

const postUrl = 'http://localhost:3000/api/cameras/order';

function createTag(tagName, attribute, attributeName) {
    const element = document.createElement(tagName);
    element.setAttribute(attribute, attributeName);
    return element;
}