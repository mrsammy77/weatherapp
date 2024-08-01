let input = document.querySelector('input');
let box_data = document.querySelector('.box_data')
let box_error = document.querySelector('.box_error')
let loader = document.querySelector('.loader')
let search = document.querySelector('.search');
let locations = document.querySelector('.location');
let img = document.querySelector('.weather');
let degree = document.querySelector('.degree_city h1');
let city = document.querySelector('.degree_city h2');
let weatherName = document.querySelector('.degree_city p');
let wind = document.querySelector('.wind');
let hum = document.querySelector('.humidity');
let body = document.querySelector('body');


// const apiKey = "";
// const apiUrl = "";

// async function checkWeather() {
//     const response = await fetch(apiUrl + `&appid=${apiKey}`);
//     const data = await response.json();
// }
const api_key = '7bc37fd647675feb4ba0e4fa033b1409';

function fetchData() {
    loader.innerHTML = `<img class='error' src="asset/images/giphy (2).webp"/>`
    loader.style.display = 'block';
    box_error.style.display = "none";
    box_data.style.display = 'none';
    let url = ` https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${api_key}`

    fetch(url)
        .then((res) => {
            return res.json();

        })
        .then((data) => {
            showData(data)
            setTimeout(() => {
                loader.style.display = "none";
                box_data.style.display = "block";
                box_error.style.display = "none";
            }, 1000);
        })
        .catch((err) => {
            setTimeout(() => {
                loader.style.display = "none";
                box_data.style.display = "none";
                box_error.style.display = "block";
                box_error.innerHTML = `<img class='error' src="asset/images/giphy (3).webp"/>`
            }, 1000);
            console.log(err)
        })

    input.value = '';

}


search.addEventListener('click', fetchData)
input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        fetchData()
    }
})



function showData(data) {

    const { country } = data.sys
    const { temp, humidity } = data.main
    const { speed } = data.wind
    const { id, main } = data.weather[0]

    body.className = ' ';

    if (id >= 200 && id <= 232) {
        img.src = 'asset/images/thunderstrom.png'
        body.className += ' bg thunderstorms'
    }
    else if (id >= 300 && id <= 321) {
        img.src = 'asset/images/rain (1).png'
        body.className += ' bg drizzle'
    }
    else if (id >= 500 && id <= 531) {
        img.src = 'asset/images/rain.png'
        body.className += ' bg rain'
    } else if (id >= 600 && id <= 622) {
        img.src = 'asset/images/snow.png'
        body.className += ' bg snow'
    } else if (id >= 701 && id <= 781) {
        img.src = 'asset/images/forecast.png'
        body.className += ' bg cloudy'

    } else if (id >= 801 && id <= 804) {
        img.src = 'asset/images/cloud.png'
        body.className += ' bg clouds'
    }
    else {
        img.src = 'asset/images/sun.png'
        body.className += ' bg sun'

    }



    city.innerHTML = data.name + ',' + country
    weatherName.innerHTML = main
    degree.innerHTML = Math.round(temp) + `<sup>o</sup>c`
    wind.innerHTML = speed + "km/h"
    hum.innerHTML = humidity + "%"
    console.log(data)

}





function getCurrentLocation() {
     loader.innerHTML = `<img class='error' src="https://i.gifer.com/3F3F.gif"/>`
     loader.style.display = 'block';
     box_error.style.display = "none";
     box_data.style.display = 'none';
    navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude
        let lat = position.coords.latitude;
        let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
        fetch(Currenturl)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                showData(data);
                setTimeout(() => {
                    loader.style.display = "none";
                    box_data.style.display = "block";
                    box_error.style.display = "none";
                }, 1000);
            })
            .catch((err) => {
                setTimeout(() => {
                    loader.style.display = "none";
                    box_data.style.display = "none";
                    box_error.style.display = "block";
                    box_error.innerHTML = `<img class='error' src="/asset/imgs/not-found.png"/>`
                }, 1000);
                console.log(err)
            })

    }, (error) => {
        const { message } = error;
        box_error.innerHTML = `<p class="Error">${message}</p>`
    })
}
locations.addEventListener('click', getCurrentLocation)