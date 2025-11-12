const currentTemp = document.querySelector('#current-temp');
const weatherPic = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const lat = 49.75;
const lon = 6.64;
const apiKey = "32bfdba08ef4a392fea32e0cad0a8e2d"
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
    
    
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const description = data.weather[0].description;
    const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherPic.setAttribute('src', iconSource);
    weatherPic.setAttribute('alt', description);
    captionDesc.textContent = `${description}`;
}
