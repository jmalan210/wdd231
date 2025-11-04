const memberData = "data/members.json";
const display = document.querySelector('#display');
const gridBtn = document.querySelector('#grid-button');
const listBtn = document.querySelector('#list-button');

async function getMemberData() {
    const response = await fetch(memberData);
    const data = await response.json();
    // console.table(data.members);
    displayMembersCards(data.members);
    
}

getMemberData();

gridBtn.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
})

listBtn.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
})


const displayMembersCards = (members) => {
    members.forEach((member) => { 
        let card = document.createElement('section');
        let logo = document.createElement('img');        
        let name = document.createElement('p');
        let addressStreet = document.createElement('p');
        let addressCSZ = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('p');

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo for ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', 'auto');
        logo.setAttribute('height', '100px');
        name.setAttribute('class', 'name');
        name.textContent = `${member.name}`;
        addressStreet.textContent = `${member.streetaddress}`;
        addressCSZ.textContent = `${member.citystatezip}`
        phone.textContent = `${member.phone}`;
        url.textContent = `${member.url}`;

        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(addressStreet);
        card.appendChild(addressCSZ);
        card.appendChild(phone);
        card.appendChild(url);

        display.appendChild(card);

        

    
    });
};