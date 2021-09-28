var current = document.querySelector("#current");
var searchBtn = document.getElementById("searchBtn");

var locateCurrent = function (locate) {
  current.innerHTML=" ";
  var cityName = locate;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35"
  ).then(function (weather) {
    if (weather.ok) {
      return weather.json().then(function (weather) {
        console.log(weather);
        // console grabs of business logic
        console.log("The current City is :" + weather.name);
        console.log("The city is part of this country: " + weather.sys.country);
        console.log(
          "The current Temperature is " + weather.main.temp + " °C 🌡️"
        );
        console.log(
          "The current Wind speed is " + weather.wind.speed + "KPH 🚩"
        );
        console.log("The current Humidity is " + weather.main.humidity + "%");
        console.log(
          "When this is 200, it means the fetch worked: " + weather.cod
        );
        console.log("This is the cities Latitude: " + weather.coord.lat);
        console.log("This is the cities Longitude: " + weather.coord.lon);

        // Pinpoint city location to send to locateUV
        var cityLat = weather.coord.lat;
        var cityLon = weather.coord.lon;

        locateUV(cityLat, cityLon);
        locateForecast(cityName);

        // Start building elements for display logic
        var currentWeatherEl = document.createElement("ul");
        currentWeatherEl.className =
          "flex-row, justify-space-between align-center";
        var weatherCityEl = document.createElement("li");
        weatherCityEl.textContent = "City: " + weather.name;
        var weatherCountryEl = document.createElement("li");
        weatherCountryEl.textContent = " Country: " + weather.sys.country;
        var weatherTempEl = document.createElement("li");
        weatherTempEl.textContent = "Temp: " + weather.main.temp + " °C 🌡️";
        var weatherWindEl = document.createElement("li");
        weatherWindEl.textContent =
          "Wind speed: " + weather.wind.speed + " KPH 🚩";
        var weatherHumidEl = document.createElement("li");
        weatherHumidEl.textContent =
          "Humidity: " + weather.main.humidity + " %";

        // Add city name, country to div
        currentWeatherEl.appendChild(weatherCityEl);
        currentWeatherEl.appendChild(weatherCountryEl);
        currentWeatherEl.appendChild(weatherTempEl);
        currentWeatherEl.appendChild(weatherWindEl);
        currentWeatherEl.appendChild(weatherHumidEl);

        current.appendChild(currentWeatherEl);
      });
    } else {
      alert("There is a problem with your request!");
      //document.location.replace("./index.html");
    }
  });
};
// get coordinates from here weather.coord.lat + weather.coord.lon   !!!!!!
//UV index is somewhere else
var locateUV = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,daily,alerts&appid=9273ac9fe325b93d191b9daf0d028c35"
  )
    .then(function (uvIndex) {
      return uvIndex.json();
    })
    .then(function (uvIndex) {
      console.log(uvIndex);
      console.log(uvIndex.current.uvi);
      var currentUV = uvIndex.current.uvi;
      var weatherUVEl = document.createElement("li");
      weatherUVEl.textContent = "UV index: " + uvIndex.current.uvi;
      if (currentUV >= 7) {
        weatherUVEl.className = "alert alert-danger";
      }
      if (currentUV >= 4) {
        weatherUVEl.className = "alert alert-warning";
      } else {
        weatherUVEl.className = "alert alert-success";
      }

      //need to add color class
      current.appendChild(weatherUVEl);
    });
};
// This is be just for 5 day forecast
var locateForecast = function (locate) {
  var cityName = locate;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35"
  )
    .then(function (forecast) {
      return forecast.json();
    })
    .then(function (forecast) {
      console.log(forecast);
      for (var i = 7; i < forecast.list.length; i = i + 8) {
        console.log(i);
        console.log("This is the date " + forecast.list[i].dt_txt);
        console.log(
          "This is the weather icon info: " + forecast.list[i].weather[0].icon
        );
        console.log(
          "This is the weather description: " +
            forecast.list[i].weather[0].description
        );
        console.log(
          "The Temperature is " + forecast.list[i].main.temp + " °C 🌡️"
        );
        console.log(
          "The Wind speed is " + forecast.list[i].wind.speed + "KPH 🚩"
        );
        console.log("The Humidity is " + forecast.list[i].main.humidity + "%");
        console.log(
          "When this is 200, it means the fetch worked: " + forecast.cod
        );
        
        var future = document.querySelector("#future-" + [i]);
        future.innerHTML=" ";
        // id="future-title-7"
        var futureTitle = document.querySelector("#future-title-" + [i]);
        futureTitle.textContent = " ";
        //http://openweathermap.org/img/wn/10d@2x.png
        var futureForecastEl = document.createElement("ul");
        futureForecastEl.className = "flex-start, padding:0px";
        var forecastDateEl = document.createElement("h2");
        forecastDateEl.textContent = "Date: " + forecast.list[i].dt_txt;

        var forecastIconEl = document.getElementById("icon-" + [i]);
        forecastIconEl.innerHTML=
          '<img src="http://openweathermap.org/img/wn/' +
          forecast.list[i].weather[0].icon +
          '@2x.png">' +
          forecast.list[i].weather[0].description;

        var forecastTempEl = document.createElement("li");
        forecastTempEl.textContent =
          "Temp: " + forecast.list[i].main.temp + " °C 🌡️";
        var forecastWindEl = document.createElement("li");
        forecastWindEl.textContent =
          "Wind speed: " + forecast.list[i].wind.speed + " KPH 🚩";
        var forecastHumidEl = document.createElement("li");
        forecastHumidEl.textContent =
          "Humidity: " + forecast.list[i].main.humidity + " %";

        futureForecastEl.appendChild(forecastTempEl);
        futureForecastEl.appendChild(forecastWindEl);
        futureForecastEl.appendChild(forecastHumidEl);

        futureTitle.appendChild(forecastDateEl);
        future.appendChild(futureForecastEl);
      }
    });
};

// $("#searchBtn").on("click", locateCurrent("london"));
searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  var locateCity = document.querySelector("#locateCity").value;
  locateCurrent(locateCity);
})