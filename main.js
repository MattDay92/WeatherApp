console.log('hello world')

const getLocation = async (city, state, country) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c`
    res = await fetch(url)
    data = await res.json()

    console.log(data)

    const myLocation = {
        lat: data['0'].lat,
        lon: data['0'].lon
    }
}

getLocation('indianapolis', 'in', 'USA')

const getWeather = async (lat, lon) => {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d1bb47c46fd0c755d7d92c0c15dcc1c&units=imperial`
    res = await fetch(url)
    data = await res.json()
    console.log(data)

    const myWeather = {
        location: data.name,
        "current_temp": data.main.temp,
        "max_temp": data.main['temp_max'],
        "min_temp": data.main['temp_min'],
        type: data.weather['0'].main,
        wind: data.wind.speed

    }
    console.log(myWeather)
};

getWeather(39.79, -86.15)