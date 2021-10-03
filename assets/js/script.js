// Search button and Current weather banner. Count is for storage tracking later
var current = document.querySelector("#current");
var searchBtn = document.getElementById("searchBtn");
var count = 0;

// locate variable comes in and fetches from API holds lat and lon and sends it to Locate UV,LocateForecast then builds current WeatherEl
var locateCurrent = function (locate) {
  current.innerHTML = " ";
  var cityName = locate;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=9273ac9fe325b93d191b9daf0d028c35"
  ).then(function (weather) {
    if (weather.ok) {
      return weather.json().then(function (weather) {
        console.log(weather);
        // console.log("This is the cityname:" + cityName);
        console.log("the current weather is " + weather.weather[0].description )
        console.log("the current weather icon is " + weather.weather[0].icon )
        // console.log("The current City is :" + weather.name);
        // console.log("The city is part of this country: " + weather.sys.country);
        // console.log(
        //   "The current Temperature is " + weather.main.temp + " °C 🌡️"
        // );
        // console.log(
        //   "The current Wind speed is " + weather.wind.speed + "KPH 🚩"
        // );
        // console.log("The current Humidity is " + weather.main.humidity + "%");
        // console.log(
        //   "When this is 200, it means the fetch worked: " + weather.cod
        // );
        // console.log("This is the cities Latitude: " + weather.coord.lat);
        // console.log("This is the cities Longitude: " + weather.coord.lon);

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
        weatherTempEl.textContent =
          "Temp: " + Math.round(weather.main.temp) + " °C 🌡️";
        var weatherWindEl = document.createElement("li");
        weatherWindEl.textContent =
          "Wind speed: " + Math.round(weather.wind.speed) + " KPH 🚩";
        var weatherHumidEl = document.createElement("li");
        weatherHumidEl.textContent =
          "Humidity: " + weather.main.humidity + " % 💧";
        var weatherIconEl = document.createElement("li");
        weatherIconEl.innerHTML =
          '<img src="http://openweathermap.org/img/wn/' +
          weather.weather[0].icon +
          '@2x.png">' +
          weather.weather[0].description;

        
        currentWeatherEl.appendChild(weatherCityEl);
        currentWeatherEl.appendChild(weatherCountryEl);
        currentWeatherEl.appendChild(weatherTempEl);
        currentWeatherEl.appendChild(weatherWindEl);
        currentWeatherEl.appendChild(weatherHumidEl);
        currentWeatherEl.appendChild(weatherIconEl);

        current.appendChild(currentWeatherEl);
      });
    } else {
      //if search is empty, or fails clear and refresh
      alert("There was an error. Please try again!")
      localStorage.clear();
      document.location.replace("./index.html");
    }

    
  });
};
// get coordinates from here weather.coord.lat + weather.coord.lon   !!!!!!
//locateUV searches for UV with lat and lon from ^
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
      var weatherUVEl = document.createElement("div");
      weatherUVEl.textContent = "UV index: " + uvIndex.current.uvi;
      if (currentUV >= 7) {
        weatherUVEl.className = "alert alert-danger";
      }
      if (currentUV >= 4) {
        weatherUVEl.className = "alert alert-warning";
      } else {
        weatherUVEl.className = "alert alert-success";
      }

      current.appendChild(weatherUVEl);
    });
};


// LocateForecast looks for 5 day forecast
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
        // console.log(i);
    
        // console.log("This is the date " + forecast.list[i].dt_txt);
        var forecastDateText = forecast.list[i].dt_txt.split(" ");
        forecastDate = forecastDateText[0];
        // console.log(forecastDate);

        // console.log(
        //   "This is the weather icon info: " + forecast.list[i].weather[0].icon
        // );
        // console.log(
        //   "This is the weather description: " +
        //     forecast.list[i].weather[0].description
        // );
        // console.log(
        //   "The Temperature is " + forecast.list[i].main.temp + " °C 🌡️"
        // );
        // console.log(
        //   "The Wind speed is " +
        //     Math.round(forecast.list[i].wind.speed * 3.6) +
        //     "km/h 🚩"
        // );
        // console.log(
        //   "The Humidity is " + forecast.list[i].main.humidity + "% 💧"
        // );
        // console.log(
        //   "When this is 200, it means the fetch worked: " + forecast.cod
        // );

        var future = document.querySelector("#future-" + [i]);
        future.innerHTML = " ";
    
        var futureTitle = document.querySelector("#future-title-" + [i]);
        futureTitle.textContent = " ";
      
        var futureForecastEl = document.createElement("ul");
        futureForecastEl.className = "flex-start, padding:0px";
        var forecastDateEl = document.createElement("h3");
        forecastDateEl.textContent = "Date: " + forecastDate;

        var forecastIconEl = document.getElementById("icon-" + [i]);
        forecastIconEl.innerHTML =
          '<img src="http://openweathermap.org/img/wn/' +
          forecast.list[i].weather[0].icon +
          '@2x.png">' +
          forecast.list[i].weather[0].description;

        var forecastTempEl = document.createElement("li");
        forecastTempEl.textContent =
          "Temp: " + Math.round(forecast.list[i].main.temp) + " °C 🌡️";
        var forecastWindEl = document.createElement("li");
        forecastWindEl.textContent =
          "Wind speed: " +
          Math.round(forecast.list[i].wind.speed * 3.6) +
          " km/h 🚩";
        var forecastHumidEl = document.createElement("li");
        forecastHumidEl.textContent =
          "Humidity: " + forecast.list[i].main.humidity + " % 💧";

        futureForecastEl.appendChild(forecastTempEl);
        futureForecastEl.appendChild(forecastWindEl);
        futureForecastEl.appendChild(forecastHumidEl);

        futureTitle.appendChild(forecastDateEl);
        future.appendChild(futureForecastEl);
      }
    });
};



// When search button is submitted it will take value of input and give to LocateCurrent(and other 2 fetches)
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var locateCity = document.querySelector("#locateCity").value;
  locateCurrent(locateCity);
  $('#locateCity').val('');

  var cityLi = $("<li>").addClass("list-group-item");
  var cityBtn = $("<button>").addClass("btn saveBtn btn-info col-lg").text(locateCity);
  cityLi.append(cityBtn);
  $("#history").prepend(cityLi);

  // Count used to store city buttons
  localStorage.setItem("city-" + count, locateCity);
  localStorage.setItem("amountSearch", count);
  count++;
  
});

// These 3 lines of code took me 5 hours to get working. When a generated button is clicked it will re-run locateCurrent
$(".list-group").on("click", function (event) {
  var city = event.target.innerHTML;
  locateCurrent(city);
});

// On a reload, loadCities() will generate previous buttons
var loadCities = function () {
  var amountBtn = localStorage.getItem("amountSearch");
  // if first time return
  if (amountBtn === null){
    return;
  }
// builds previous buttons
  for (var i = -1; i < amountBtn; i++) {
    var loadCity = localStorage.getItem("city-"+ (i+1));
    var cityLi = $("<li>").addClass("list-group-item");
    var cityBtn = $("<button>").addClass("btn saveBtn btn-info").text(loadCity);
    cityLi.append(cityBtn);
    $("#history").prepend(cityLi);
  }
}
//runs previous searched cities
loadCities()

