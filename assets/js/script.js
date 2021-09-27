var current=document.querySelector("#current");

// Use this for the Icon weather
fetch("https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35")
.then(function(weather) {
  if (weather.ok){
  return weather.json() 
.then(function(weather){
  console.log(weather)
  // current grabs of business logic
        console.log("The current City is :" + weather.name)
        console.log("The city is part of this country: " + weather.sys.country)
        console.log("The current Temperature is " +weather.main.temp+" °C 🌡️")
        console.log("The current Wind speed is " + weather.wind.speed+ "KPH 🚩")
        console.log("The current Humidity is " +weather.main.humidity + "%")
        console.log("When this is 200, it means the fetch worked: "+ weather.cod)
  
  // Start building elements for display logic
  var currentWeatherEl= document.createElement("ul")
      currentWeatherEl.classList = "flex-row, justify-space-between align-center";
  var weatherCityEl = document.createElement("li");
      weatherCityEl.textContent ="City: " + weather.name;
  var weatherCountryEl = document.createElement("li");
      weatherCountryEl.textContent = " Country: " +weather.sys.country;
  var weatherTempEl = document.createElement("li");
      weatherTempEl.textContent = "Temp: " + weather.main.temp +" °C 🌡️";
  var weatherWindEl = document.createElement("li");
      weatherWindEl.textContent = "Wind speed: " + weather.wind.speed+ " KPH 🚩";
  var weatherHumidEl = document.createElement("li");   
      weatherHumidEl.textContent = "Humidity: " +weather.main.humidity + " %";
  var weatherUVEl=document.createElement("li");
      weatherUVEl.textContent = "This is where the uv will go";

      
  // Add city name, country to div
  currentWeatherEl.appendChild(weatherCityEl);
  currentWeatherEl.appendChild(weatherCountryEl);
  currentWeatherEl.appendChild(weatherTempEl);
  currentWeatherEl.appendChild(weatherWindEl);
  currentWeatherEl.appendChild(weatherHumidEl);
  currentWeatherEl.appendChild(weatherUVEl);

  current.appendChild(currentWeatherEl)
})
  }else{
  alert("There is a problem with your request!");
  document.location.replace("./index.html");
};

})

// This is be just for 5 day forecast 
fetch("https://api.openweathermap.org/data/2.5/forecast?q=london&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35")
.then(function(forecast) {
  return forecast.json();})
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
  
  var future=document.querySelector("#future-"+[i]);
  // id="future-title-7"
  var futureTitle=document.querySelector("#future-title-"+[i]);
  //http://openweathermap.org/img/wn/10d@2x.png
  var futureForecastEl= document.createElement("ul")
      futureForecastEl.classList = "flex-row, justify-space-between align-center";
  var forecastDateEl = document.createElement("h2");
      forecastDateEl.textContent ="Date: " + forecast.list[i].dt_txt;
  
  var forecastIconEl=document.querySelector("#icon-"+[i])
  forecastIconEl.innerHTML='<img src="http://openweathermap.org/img/wn/'+ forecast.list[i].weather[0].icon+'@2x.png"></img>';     

  var forecastTempEl = document.createElement("li");
      forecastTempEl.textContent = "Temp: " + forecast.list[i].main.temp +" °C 🌡️";
  var forecastWindEl = document.createElement("li");
      forecastWindEl.textContent = "Wind speed: " + forecast.list[i].wind.speed+ " KPH 🚩";
  var forecastHumidEl = document.createElement("li");   
      forecastHumidEl.textContent = "Humidity: " +forecast.list[i].main.humidity + " %";
       
      futureForecastEl.appendChild(forecastTempEl);
      futureForecastEl.appendChild(forecastWindEl);
      futureForecastEl.appendChild(forecastHumidEl);
      
      futureTitle.appendChild(forecastDateEl)
      future.appendChild(futureForecastEl)
        // console.log(response)
        // console.log(response)
        // console.log(response)       
    }})

    // <div class="row">
    // <div class="card bg-light mb-3" style="max-width: 18rem;">
    //     <div class="card-header">Date of 5 day</div>
    //     <div class="card-body">
    //       <h5 class="card-title">Icon Would go here</h5>
    //       <p class="card-text">This is where the Temp, Wind and Humidity would go</p>
    //     </div>
    //   </div>