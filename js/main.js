
window.addEventListener('load', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetch("https://ipapi.co/json/")
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.city === '') return;
                        document.querySelector('.search-box input').value = data.city;
                        getWeather(data.city);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе данных геолокации: ' + error.message);
                    });
            },
            (error) => {
                console.error(error);
            }
        );
    }



    document.querySelector('.search-box button').addEventListener('click', () => {
        const city = document.querySelector('.search-box input').value;
        if (city === '')
            return;
        getWeather(city)

    });

    document.querySelector(".search-box input").addEventListener('blur', () => {
        const city = document.querySelector('.search-box input').value;
        if (city === '')
            return;
        getWeather(city)
    });
});

function getWeather(city) {

    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');

    const APIKey = '60745ca83212e1f5d7c9688adbfe3cae';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = weatherBox.querySelector('img');
            const temperature = weatherBox.querySelector('.temperature');
            const description = weatherBox.querySelector('.description');
            const humidity = weatherDetails.querySelector('.humidity span');
            const wind = weatherDetails.querySelector('.wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });

}
