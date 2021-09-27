


// To find weather fo"r 5 day call https://openweathermap.org/forecast5
// fetch command is  "api.openweathermap.org/data/2.5/forecast?q="+ {city name}+"&units=metric&appid=" + "9273ac9fe325b93d191b9daf0d028c35"

// This is where you would find the city tag after q for cityname 
// "city": {
//     "id": 2643743,
//     "name": "London",

// Need to use Metric units if not there temperatures will be in Kelvin! https://openweathermap.org/forecast5#:~:text=api.openweathermap.org/data/2.5/find%3Fq%3DLondon%26units%3Dmetric

// Time to get fetch working once for london

fetch(
   //This is the fetch request
    "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=9273ac9fe325b93d191b9daf0d028c35"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response)})