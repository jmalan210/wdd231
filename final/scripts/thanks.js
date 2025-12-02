const formInfo = new URLSearchParams(window.location.search);
const firstName = document.getElementById('first-name');
const tourName = document.getElementById('tour-name');

firstName.innerText = formInfo.get('firstname');
tourName.innerText = formInfo.get('interest');

function showOpenedTours() {
    const tourArray = JSON.parse(localStorage.getItem("openedModals") || "[]");
    const tourInterest = document.getElementById('tour-interest-list');


    if (tourArray.length === 0) { return; }
    
    const uniqueTours = [...new Set(tourArray)];
    const selectBoxTour = tourName.innerText;
    const remainingTours = uniqueTours
        .filter(tour => tour !== selectBoxTour)
        .sort((a, b) => a.localeCompare(b));

    if (remainingTours.length === 0) return;

    tourInterest.innerText = `We noticed you also looked at:`

        remainingTours.forEach(tour => {
            const tourListItem = document.createElement('p');
            tourListItem.innerHTML = `<strong>${tour}</strong>`;
            tourInterest.appendChild(tourListItem);

        
        });

    const furtherInterest = document.createElement('p');
    if (remainingTours.length === 1) {
        furtherInterest.innerText = `If you'd like more info about this tour, just ask the travel agent when they call!`;
    } else 
        furtherInterest.innerText = `If you'd like more info about these tours, just ask the travel agent when they call!`;
        
    tourInterest.appendChild(furtherInterest);

 

    };

showOpenedTours();