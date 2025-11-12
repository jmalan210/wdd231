const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const weatherDescription = document.querySelector('#weather-description');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const lat = 42.91;
const lon = -112.41;
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
    const temp = Math.round(data.main.temp);
    currentTemp.innerHTML = `${temp}&deg;F`;
    const description = data.weather[0].description;
    const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSource);
    weatherIcon.setAttribute('alt', description);
    weatherDescription.textContent = `${description}`;
    const high = Math.round(data.main.temp_max);
    highTemp.innerHTML = `High: ${high}&deg;`;
    const low = Math.round(data.main.temp_min);
    lowTemp.innerHTML = `Low: ${low}&deg;`;
    const srise = convertUTCToMountainTime(data.sys.sunrise);
    const sset = convertUTCToMountainTime(data.sys.sunset);
    sunrise.innerHTML= `Sunrise: ${srise}`;
    sunset.innerHTML = `Sunset: ${sset}`;
   
}

function convertUTCToMountainTime(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleTimeString("en-US", {
        timeZone: "America/Denver",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    
}
