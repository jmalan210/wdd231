import { attractions } from "../data/attractions.mjs";
const cardArea = document.querySelector('.attraction-cards');
const welcomeMessage = document.querySelector('.welcome-msg');


function getAttractionData() {
    // console.table(attractions);
    attractionCards(attractions);
}


function attractionCards(attractions) {
  attractions.forEach(attraction => {
    

    let card = document.createElement('section');
    let name = document.createElement('h3');
    let cost = document.createElement('p');
    let address = document.createElement('address');
    let description = document.createElement('p');
    let img = document.createElement('img');

    name.textContent = `${attraction.name}`;
    cost.textContent = `${attraction.cost}`;
    address.textContent = `${attraction.address}`;
    description.textContent = `${attraction.description}`;
    cost.setAttribute('id', 'cost');
    description.setAttribute('id', 'description');
    img.setAttribute('src', attraction.photo);
    img.setAttribute('alt', attraction.name);
    img.setAttribute('loading', 'lazy');
    

    card.appendChild(name);
    card.appendChild(cost);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(img);
      
    cardArea.appendChild(card);



  })
};

getAttractionData();

function checkVisit() {
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  if (!lastVisit) {
    localStorage.setItem('lastVisit', now);
    welcomeMessage.textContent = "Welcome! Let us know if you  have any questions!"

  }

  const lastVisitTime = Number(lastVisit);
  const diffMs = now - lastVisitTime;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  localStorage.setItem('lastVisit', now);

  if (diffDays < 1)
  {
    welcomeMessage.textContent = "Back so soon! Awesome!"
  }
  else {
    welcomeMessage.textContent = `You last visited ${Math.floor(diffDays)} days ago.`;
  }

}

checkVisit();