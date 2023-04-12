console.log('hello world')

navigator.geolocation.getCurrentPosition(async (pos) => {
    const coordinates = pos.coords

    const currentLocation = {
        lat: coordinates.latitude,
        lon: coordinates.longitude
    }
    console.log(currentLocation)

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c&units=imperial`
    res = await fetch(url)
    data = await res.json()

    const myWeather = {
        location: "Your Current Weather",
        state: " ",
        "current_temp": Math.round(data.main.temp),
        "feels_like": Math.round(data.main['feels_like']),
        "max_temp": Math.round(data.main['temp_max']),
        "min_temp": Math.round(data.main['temp_min']),
        type: data.weather['0'].main,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed)
    }
    console.log(myWeather)

    img = `/images/${myWeather.type}.jpeg`
    
    addToPage(myWeather)
    backgroundImage(img)
})



const getLocation = async (city, state, country) => {

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c`
    res = await fetch(url)
    data = await res.json()

    const myLocation = {
        lat: data['0'].lat,
        lon: data['0'].lon
    }

    return myLocation
}


const getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.cityName.value
    const state = event.target.stateName.value
    const country = event.target.countryName.value

    console.log(city, state, country)
    const myLocation = await getLocation(city, state, country)
    console.log(myLocation)

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation.lat}&lon=${myLocation.lon}&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c&units=imperial`
    res = await fetch(url)
    data = await res.json()
    console.log(data)

    url5day = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLocation.lat}&lon=${myLocation.lon}&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c&units=imperial`
    res5day = await fetch(url5day)
    data5 = await res5day.json()
    console.log(data5)

    const myWeather = {
        location: data.name,
        state: state.toUpperCase(),
        "current_temp": Math.round(data.main.temp),
        "feels_like": Math.round(data.main['feels_like']),
        "max_temp": Math.round(data.main['temp_max']),
        "min_temp": Math.round(data.main['temp_min']),
        type: data.weather['0'].main,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed)
    }

    const myWeather1 = {
        time: data5.list[0]['dt_txt'],
        "current_temp": data5.list[0].main.temp,
        "max_temp": data5.list[0].main['temp_max'],
        "min_temp": data5.list[0].main['temp_min'],
        type: data5.list[0].weather['0'].main,
    }

    const myWeather2 = {
        time: data5.list[1]['dt_txt'],
        "current_temp": data5.list[1].main.temp,
        "max_temp": data5.list[1].main['temp_max'],
        "min_temp": data5.list[1].main['temp_min'],
        type: data5.list[1].weather['0'].main,
    }

    const myWeather3 = {
        time: data5.list[2]['dt_txt'],
        "current_temp": data5.list[2].main.temp,
        "max_temp": data5.list[2].main['temp_max'],
        "min_temp": data5.list[2].main['temp_min'],
        type: data5.list[2].weather['0'].main,
    }

    const myWeather4 = {
        time: data5.list[3]['dt_txt'],
        "current_temp": data5.list[3].main.temp,
        "max_temp": data5.list[3].main['temp_max'],
        "min_temp": data5.list[3].main['temp_min'],
        type: data5.list[3].weather['0'].main,
    }

    const myWeather5 = {
        time: data5.list[4]['dt_txt'],
        "current_temp": data5.list[4].main.temp,
        "max_temp": data5.list[4].main['temp_max'],
        "min_temp": data5.list[4].main['temp_min'],
        type: data5.list[4].weather['0'].main,
    }

    img = `/images/${myWeather.type}.jpeg`

    console.log(myWeather)
    console.log(myWeather1)
    addToPage(myWeather)
    // addToPage5Day(myWeather1)
    // addToPage5Day(myWeather2)
    // addToPage5Day(myWeather3)
    // addToPage5Day(myWeather4)
    // addToPage5Day(myWeather5)
    backgroundImage(img)

};

getWeather()
const form = document.getElementById('locationForm')
form.addEventListener('submit', getWeather)


const addToPage = (w) => {
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="row d-flex justify-content-center">
    <div class="card" style="width: 18rem;">
        <div class="card-body text-center">
          <h5 class="card-title">${w.location}  ${w.state}</h5>
          <p class="card-text">${w.type}</p>
          <p class="card-text">Current Temperature: ${w['current_temp']}&#8457 </p> 
          <p class="card-text">Feels Like: ${w['feels_like']}&#8457 </p> 
          <p class="card-text">High: ${w['max_temp']}&#8457 </p> 
          <p class="card-text">Low: ${w['min_temp']}&#8457 </p> 
          <p class="card-text">Wind Speed:  ${w.wind} mph</p>
          <p class="card-text">Humidity:  ${w.humidity}%</p>
        </div>
        </div>
    </div>`

    const container = document.querySelector('.weatherCard');
    if (container.innerHTML != '') {
        container.innerHTML = ''
    }

    container.append(card)

};

const backgroundImage = (img) => {
    document.getElementById("container").style.backgroundImage = "url(" + img + ")";
}

// const addToPage5Day = (w) => {
//     const card2 = document.createElement('div')
//     card2.innerHTML = `
//     <div class="row d-flex justify-content-center">
//     <div class="card" style="width: 18rem;">
//         <div class="card-body text-center">
//           <p class="card-text">${w.time}</p>
//           <p class="card-text">${w.type}</p>
//           <p class="card-text">Current Temperature: ${w['current_temp']} </p> 
//           <p class="card-text">High: ${w['max_temp']} </p> 
//           <p class="card-text">Low: ${w['min_temp']} </p> 
//         </div>
//         </div>
//     </div>`

//     const container = document.querySelector('.5dayWeatherCard');
//     if (container.innerHTML != '') {
//         container.innerHTML = ''
//     }

//     container.append(card2)

// };




