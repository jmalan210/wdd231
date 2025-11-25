
async function loadCities() {
    try {
        const res = await fetch('data/cities.json');
        if (res.ok) {
            const data = await res.json();
            return data.cities;
        } else {
            throw Error(await res.text());
        }
    }
    catch (error) {
        console.log(error);
    }
    }

async function getWeather(city) {
    const apiKey = "32bfdba08ef4a392fea32e0cad0a8e2d";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=imperial`;
    try {
        const res = await fetch(url);
        if (res.ok) {
            return await res.json();
        }
        else {
            throw Error(await res.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function getLocalTime(timeZone) {
    const timeString = new Date().toLocaleString("en-US", {
        timeZone: timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
   
    return timeString.replace(/AM|PM/, match => match.toLowerCase());
}

function randomCities(cities, n) {
    const shuffled = [...cities].sort(() => 0.5 - Math.random()); //shuffles array
    return shuffled.slice(0, n);
}

async function showCityWeather() {
    const cities = await loadCities();
    if (!cities || cities.length < 5) return;
    
    const randomCitiesArray = randomCities(cities, 5);

    let html = '';

    for (const city of randomCitiesArray) {
         const weather = await getWeather(city);
        const time = getLocalTime(city.timezone);
        const iconSource = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        html += `
        <div class="weather-card">
        <h3>${city.name}</h3>
        <p class="time">${time}</p>
        <p class="temp">${Math.round(weather.main.temp)}°F</p>
        <img src="${iconSource}" alt="${weather.weather[0].description}" class="weather-icon"> 
        <p class="description">${weather.weather[0].description}</p>
        </div>
        `
    }
   
    document.querySelector('.weather-cards').innerHTML = html;
};

showCityWeather();