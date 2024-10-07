const locations = [
  { name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917 },
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 },
  { name: 'Cape Town, South Africa', latitude: -33.9249, longitude: 18.4241 }
];

async function fetchWeather(location) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      location: location.name,
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
      time: data.current_weather.time
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(weatherData) {
  const container = document.getElementById('weather-container');
  container.innerHTML = '';

  weatherData.forEach(data => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    weatherCard.innerHTML = `
      <div class="weather-header">${data.location}</div>
      <div class="weather-info">
        <div class="temp">${data.temperature}°C</div>
        <p>Windspeed: ${data.windspeed} km/h</p>
        <p>Last updated: ${new Date(data.time).toLocaleTimeString()}</p>
      </div>
    `;

    container.appendChild(weatherCard);
  });
}

async function updateWeather() {
  const weatherDataPromises = locations.map(location => fetchWeather(location));
  const weatherData = await Promise.all(weatherDataPromises);

  displayWeather(weatherData);
}

updateWeather();

setInterval(updateWeather, 600000);
