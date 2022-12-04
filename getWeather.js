let changeCityBtn = document.getElementById("changeCityBtn");
let findCityBox = document.getElementById("findCityBox");

function showInputBox() {
    changeCityBtn.classList.toggle("active-background");
    findCityBox.classList.toggle("show");
}
const APIKey = "cb6c5ef71de718644e0fbe91a6c90a7c";
/**
 *
 * We determine the constant of the id function, because HTML can’t be used directly in JavaScript.
 * @type {Element}
 */
let inputval = document.querySelector('#city-box');
let btn = document.querySelector('#btn-search');
let city = document.querySelector('#cityoutput')
let description = document.querySelector('#description')
let temp = document.querySelector('#temp')
let wind = document.querySelector('#wind')
apik = "cb6c5ef71de718644e0fbe91a6c90a7c"


/**
 *
 * We convert the temperature scale from Kelvin to Celsius.
 * @type {Element}
 */
function convertion(val)
{
    return (val - 273).toFixed(2)
}

/**
 *
 * We get the data with the help of the fetch method.
 * The weather data comes from this API.
 * @type {Element}
 */
btn.addEventListener('click', function()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())
        .then(data =>
        {
            let nameval = data['name']
            let descrip = data['weather']['0']['description']
            let tempature = data['main']['temp']
            let wndspd = data['wind']['speed']
            /**
             *
             * We set the data that needs to be displayed using HTML.
             * @type {Element}
             */
            city.innerHTML=`Weather of <span>${nameval}<span>`
            temp.innerHTML = `Temperature: <span>${ convertion(tempature)} C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`

        })
        .catch(err => alert('You entered Wrong city name'))
})
/**
 *
 *
 * @type {string}
 */

function getWeatherData(long,lati) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${APIKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((weatherData) => {
            // console.log(weatherData);
            temp.innerText =
                Math.floor(weatherData.main.temp) + "°C";

            city.innerText =
                weatherData.weather[0].main + " in " + weatherData.name;

        });
}
/**
 *
 *
 * @type {string}
 */

navigator.geolocation.getCurrentPosition(
    (position) => {
        getWeatherData(position.coords.longitude, position.coords.latitude);
    },
    (positionError) => {
        fetch("https://api.ipify.org")
            .then((response) => response.text())
            .then((ip) => {
                fetch(`http://ip-api.com/json/${ip}`)
                    .then((response) => response.json())
                    .then((position) => {
                        getWeatherData(position.lon, position.lat);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
);


