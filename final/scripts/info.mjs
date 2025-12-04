import { loadTours } from "./loadtours.mjs";

const dropDown = document.getElementById("interest");
const tours = await loadTours();

tours.sort((a, b) => a.title.localeCompare(b.title));

tours.forEach(tour => {
    const option = document.createElement('option');
    option.textContent = tour.title;
    option.value = tour.id || tour.title;
    dropDown.appendChild(option);
});