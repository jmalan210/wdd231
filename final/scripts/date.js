const today = new Date().getFullYear();
const mySpan = document.getElementById('currentyear');

mySpan.textContent = today;

const lastModified = document.getElementById('lastModified');
let lastModif = new Date(document.lastModified);

lastModified.innerText = `Last Modified ${lastModif}`;




