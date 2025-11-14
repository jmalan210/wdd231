const memberData = "data/members.json";
const spotlightDiv = document.querySelector('#spotlights');

async function getData() {
    const response = await fetch(memberData);
    const data = await response.json();
    console.table(data.members);
   
    const spotlightMembers = data.members.filter(m => m.level === 1 || m.level === 2);
    
    const highlighted = spotlightMembers
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
     displaySpotlightCards(highlighted);

}

getData();



const displaySpotlightCards = (spotlightMembers) => {
    spotlightMembers.forEach((member) => {
        let card = document.createElement('section');
        let divAddress = document.createElement('div');
        let divCardCenter = document.createElement('div');
        let logo = document.createElement('img');
        let name = document.createElement('p');
        let addressStreet = document.createElement('p');
        let addressCSZ = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('a');
        let membershipLevel = document.createElement('img');

        divCardCenter.setAttribute('class', 'card-center')
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo for ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('class', 'spotlightlogo')
        name.setAttribute('class', 'name');

        
        membershipLevel.setAttribute('alt', `Logo for ${member.name}`);
        membershipLevel.setAttribute('loading', 'lazy');
        membershipLevel.setAttribute('width', '50');
        membershipLevel.setAttribute('height', '50');
        membershipLevel.setAttribute('class', 'star');

        url.setAttribute('class', 'url');

        name.textContent = `${member.name}`;
        addressStreet.textContent = `${member.streetaddress}`;
        addressCSZ.textContent = `${member.citystatezip}`
        phone.textContent = `${member.phone}`;
        
        if (member.level === 1) {
           
            membershipLevel.setAttribute('src', "images/goldstar.svg");
            membershipLevel.setAttribute('alt', `gold star`);
           
        }
        if (member.level === 2) {
            membershipLevel.setAttribute('src', "images/silver-star.svg");
            membershipLevel.setAttribute('alt', `silver star`);
            
        }

        url.href = `${member.url}`;
        url.setAttribute('target', 'blank');
        url.innerHTML = `${member.url}`;

        card.appendChild(membershipLevel);
        
        divAddress.appendChild(name);
        divAddress.appendChild(addressStreet);
        divAddress.appendChild(addressCSZ);
        divAddress.appendChild(phone);
        divCardCenter.appendChild(logo);
        divCardCenter.appendChild(divAddress);
        card.appendChild(divCardCenter);
        card.appendChild(url);
        
        

        spotlightDiv.appendChild(card);
    })
}