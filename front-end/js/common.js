const url = 'http://localhost:3000/api/cameras/';

function createTag(tagName, attribute, attributeName) {
    const element = document.createElement(tagName);
    element.setAttribute(attribute, attributeName);
    return element;
}