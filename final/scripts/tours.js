async function loadTours() {
    try {
        const response = await fetch('data/tours.json');
        if (response.ok) {
            const data = await response.json();
            return data.tours;
        
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
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
        <img src="${tour.img}" alt="${tour.title}">
        <p>${tour.details}</p>
        `;

        cardsDiv.appendChild(card);
    });
};



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
    if (allTours) {
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
   