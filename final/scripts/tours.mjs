import { loadTours } from "./loadtours.mjs";
let allTours = [];


const modal = document.createElement('dialog');
modal.classList.add('tour-details');
modal.innerHTML = `
<button class="close-modal">X</button>
<div class="modal-inner-content">
<h3 id="modal-title"></h3>
<p class="date" id="modal-date"></p>
<img id="modal-img" src="" alt="">
<p id="modal-details"></p>
</div>

`;
document.body.appendChild(modal);
modal.close();


const closeButton = modal.querySelector('.close-modal');

closeButton.addEventListener('click', () => modal.close());


function openModal(tour) {
    document.getElementById('modal-title').textContent = tour.title;
    document.getElementById('modal-date').textContent = tour.date;
    const img = document.getElementById('modal-img');
    img.src = tour.img;
    img.alt = tour.title;
    document.getElementById('modal-details').textContent = tour.details;
    modal.showModal();
    recordOpenedModal(tour.title);
}

function recordOpenedModal(title) {
    console.log("recordOpenedModal called with:", title);
    const opened = JSON.parse(localStorage.getItem("openedModals") || '[]');
    if (!opened.includes(title)) {
        opened.push(title);
        localStorage.setItem("openedModals", JSON.stringify(opened));
       
    }
}

    
function createCards(tours) {
    const cardsDiv = document.getElementById('tour-cards');
    cardsDiv.innerHTML = '';

    tours.forEach(tour => {
        const card = document.createElement('div');
        card.classList.add("tour-card");

        card.innerHTML = `
        <h3>${tour.title}</h3>
        <p class="date">${tour.date}</p>
        <img src="${tour.img}" alt="${tour.title}" loading="lazy">
        `;
        
        card.addEventListener('click', () => openModal(tour)); 
        cardsDiv.appendChild(card);
    });
}
    

function filterTours(region) {
    if (region === 'all') {
        createCards(allTours);
    } else{
        const filtered = allTours.filter(tour => tour.region.toLowerCase() === region);
        createCards(filtered);
        }
}

document.addEventListener('DOMContentLoaded', async () => {
    allTours = await loadTours();
    if (allTours.length) {
        allTours.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        createCards(allTours);
    }
});

const customSelect = document.querySelector('.custom-select');
const trigger = customSelect.querySelector('.custom-select-trigger');
const options = customSelect.querySelectorAll('.custom-option');

trigger.addEventListener('click', () => {
    customSelect.classList.toggle('open');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        trigger.textContent = option.textContent;

        const region = option.dataset.value.toLowerCase();
        filterTours(region);

        customSelect.classList.remove('open');
    });

});

//closes the menu if the user clicks outside of it
document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
    customSelect.classList.remove('open');
    }
});

