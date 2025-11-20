import { attractions } from "../data/attractions.mjs";
const cardArea = document.querySelector('.attraction-cards');



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
    let button = document.createElement('button');
    

    name.textContent = `${attraction.name}`;
    cost.textContent = `Cost: ${attraction.cost}`;
    address.textContent = `${attraction.address}`;
    cost.setAttribute('id', 'cost');
    description.textContent = `${attraction.description}`;
    description.setAttribute('id', 'info');
    img.setAttribute('src', attraction.photo);
    img.setAttribute('alt', attraction.name);
    img.setAttribute('loading', 'lazy');
    button.textContent = `Learn More!`
    button.setAttribute('id', 'learn-more');
    button.setAttribute('aria-label', 'learn-more');
    button.setAttribute('target', 'blank');

    button.addEventListener('click', () => {
      window.open(attraction.url, '_blank');
    });
   
    card.appendChild(name);
    card.appendChild(cost);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(img);
    card.appendChild(button);
      
    cardArea.appendChild(card);



  })
};

getAttractionData();

function checkTime() {
  const welcomeMessage = document.querySelector('.welcome-msg');
  const now = Date.now();
  
  const lastVisit = localStorage.getItem('lastVisit');
  if (!lastVisit) {
    localStorage.setItem('lastVisit', now);
    welcomeMessage.textContent = "Welcome! Let us know if you  have any questions!"
    return;
  }

  const diffDays = (now - lastVisit) / (1000 * 60 * 60 * 24);
  localStorage.setItem('lastVisit', now);

  if (diffDays < 1) {
    welcomeMessage.textContent = "Back so soon! Awesome!"
  }
  else if (Math.floor(diffDays) === 1) {
    welcomeMessage.textContent = `You last visited 1 day ago`;
  }
  else {
    welcomeMessage.textContent = `You last visited ${Math.floor(diffDays)} days ago.`;
  }


};

checkTime()
  

  


  
  

  
