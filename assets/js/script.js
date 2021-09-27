


// To find weather fo"r 5 day call https://openweathermap.org/forecast5
// fetch command is  "api.openweathermap.org/data/2.5/forecast?q="+ {city name}+"&units=metric&appid=" + "9273ac9fe325b93d191b9daf0d028c35"

// This is where you would find the city tag after q for cityname 
// "city": {
//     "id": 2643743,
//     "name": "London",

// Need to use Metric units if not there temperatures will be in Kelvin! https://openweathermap.org/forecast5#:~:text=api.openweathermap.org/data/2.5/find%3Fq%3DLondon%26units%3Dmetric

// Time to get fetch working once for london

// "weather": [
//   {
//     "id": 300,
//     "main": "Drizzle",
//     "description": "light intensity drizzle",
//     "icon": "09d"
// Use this for the Icon weather
// Might need to use current weather for RIGHT NOW https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35
//
fetch("https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35")
.then(function(weather) {
  return weather.json();
})
.then(function(weather){
  console.log(weather)
        console.log("The current City is :" + weather.main.name)
        console.log("The city is part of this country: " + weather.sys.country)
        console.log("The current Temperature is " +weather.main.temp+" °C 🌡️")
        console.log("The current Wind speed is " + weather.wind.speed+ "KPH 🚩")
        console.log("The current Humidity is " +weather.main.humidity + "%")
        console.log("When this is 200, it means the fetch worked: "+ weather.cod)
})

// This is be just for 5 day forecast 
fetch(
   //This is the fetch request
    "https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35"
  )
    .then(function(forecast) {
      return forecast.json();
    })
    .then(function(forecast) {
      console.log(forecast);
        for (var i=7;i < forecast.list.length;i=i+8) {
        console.log(i);
        console.log("This is the date " +forecast.list[i].dt_txt);
        console.log("This is the weather icon info: " + forecast.list[i].weather[0].icon);
        console.log("This is the weather description: " +forecast.list[i].weather[0].description);
        console.log("The Temperature is " +forecast.list[i].main.temp+" °C 🌡️");
        console.log("The Wind speed is " + forecast.list[i].wind.speed+ "KPH 🚩");
        console.log("The Humidity is " +forecast.list[i].main.humidity + "%");
        console.log("When this is 200, it means the fetch worked: "+ forecast.cod);
        // console.log(response)
        // console.log(response)
        // console.log(response)       
    }})