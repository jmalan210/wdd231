const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const weatherDescription = document.querySelector('#weather-description');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const todayForecast = document.querySelector('#today');
const nextDayForecast = document.querySelector('#next-day');
const thirdDayForecast = document.querySelector('#third-day');
const fourthDayForecast = document.querySelector('#fourth-day');
const fifthDayForecast = document.querySelector('#fifth-day');

const day1Day = document.querySelector('#day1');
const day2Day = document.querySelector('#day2');
const day3Day = document.querySelector('#day3');
const day4Day = document.querySelector('#day4');
const day5Day = document.querySelector('#day5');

let todayTemp; //accessible by all functions

const lat = 42.91;
const lon = -112.41;
const apiKey = "32bfdba08ef4a392fea32e0cad0a8e2d"
const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;


async function apiFetch(url, type) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (type === "weather") displayResults(data);
            if (type === "forecast") displayForecast(data);
       
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
    
    
}

apiFetch(urlWeather, "weather");
apiFetch(urlForecast, "forecast");

function displayResults(data) {
    const temperature = Math.round(data.main.temp);
    currentTemp.innerHTML = `${temperature}&deg;F`;
    const description = data.weather[0].description;
    const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSource);
    weatherIcon.setAttribute('alt', description);
    weatherDescription.textContent = `${description}`;
    const high = Math.round(data.main.temp_max);
    highTemp.innerHTML = `${high}&deg;`;
    todayTemp =  `${high}&deg;`;
    const low = Math.round(data.main.temp_min);
    lowTemp.innerHTML = `${low}&deg;`;
    const humidityValue = data.main.humidity;
    humidity.innerHTML = `${humidityValue}%`;
    const srise = convertUTCToMountainTime(data.sys.sunrise);
    const sset = convertUTCToMountainTime(data.sys.sunset);
    sunrise.innerHTML= `${srise}`;
    sunset.innerHTML = `${sset}`;
    return high;
}

function convertUTCToMountainTime(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    const time= date.toLocaleTimeString("en-US", {
        timeZone: "America/Denver",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    return time.replace("AM", "am").replace("PM", "pm");
    
}

function displayForecast(data) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const thisDay = new Date();
    const thisDayIndex = thisDay.getDay();
    const today = weekdays[thisDayIndex];
    const tomorrow = weekdays[(thisDayIndex + 1) % 7];
    const thirdDay = weekdays[(thisDayIndex + 2) % 7];
    const fourthDay = weekdays[(thisDayIndex + 3) % 7];
    const fifthDay = weekdays[(thisDayIndex + 4) % 7];

    
    day1Day.innerHTML = `${today}:`
    todayForecast.innerHTML = `${todayTemp}F`;

    day2Day.innerHTML = `${tomorrow}:`
    const tomorrowTemp = Math.round(data.list[0].main.temp_max);
    nextDayForecast.innerHTML = `${tomorrowTemp}&deg;F`;

    day3Day.innerHTML = `${thirdDay}:`
    const thirdDayTemp = Math.round(data.list[8].main.temp_max);
    thirdDayForecast.innerHTML = `${thirdDayTemp}&deg;F`;

    day4Day.innerHTML = `${fourthDay}:`
    const fourthDayTemp = Math.round(data.list[16].main.temp_max);
    fourthDayForecast.innerHTML = `${fourthDayTemp}&deg;F`;

    day5Day.innerHTML = `${fifthDay}:`
    const fifthDayTemp = Math.round(data.list[24].main.temp_max);
    fifthDayForecast.innerHTML = `${fifthDayTemp}&deg;F`;


}