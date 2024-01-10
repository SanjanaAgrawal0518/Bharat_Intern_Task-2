document.getElementById("weatherForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput").value;
    if (cityInput.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });
});

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");

    if (data.cod === "404") {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    weatherInfo.innerHTML = `
        <h2>${cityName} Weather</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
}