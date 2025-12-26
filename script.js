const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// yung function nato is para sa pag vavalidate ng input doon sa input field bale chinecheck lang if tama ba yung ininput ng user
function openweatherValidateInput(cityName) {
    const trimmed = cityName.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Please enter a city name' };
    }
    if (trimmed.length < 2) {
        return { valid: false, message: 'City name must be at least 2 characters' };
    }
    if (trimmed.length > 100) {
        return { valid: false, message: 'City name is too long' };
    }
    const invalidChars = /[<>{}[\]\\]/;
    if (invalidChars.test(trimmed)) {
        return { valid: false, message: 'Invalid characters in city name' };
    }
    return { valid: true, query: trimmed };
}


function openweatherShowError(message) {
    const errorElement = document.getElementById('openweather-error');
    const resultsElement = document.getElementById('openweather-results');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('openweather-show');
    }
    if (resultsElement) {
        resultsElement.innerHTML = '';
    }
}

function openweatherClearError() {
    const errorElement = document.getElementById('openweather-error');
    if (errorElement) {
        errorElement.classList.remove('openweather-show');
        errorElement.textContent = '';
    }
}

function openweatherShowLoading() {
    const loadingElement = document.getElementById('openweather-loading');
    if (loadingElement) {
        loadingElement.classList.add('openweather-show');
    }
}

function openweatherHideLoading() {
    const loadingElement = document.getElementById('openweather-loading');
    if (loadingElement) {
        loadingElement.classList.remove('openweather-show');
    }
}

function openweatherSetButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('openweather-loading-state');
        button.textContent = 'Searching...';
    } else {
        button.disabled = false;
        button.classList.remove('openweather-loading-state');
        button.textContent = 'Search';
    }
}

// dito yung function na natitrigger kapag nagsearch yung user
async function openweatherFetchCurrentWeather(cityName) {
    try {
        const response = await fetch(
            OPENWEATHER_API_BASE_URL + '/weather?q=' + encodeURIComponent(cityName) + '&appid=' + OPENWEATHER_API_KEY + '&units=metric'
        );
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the city name and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message) {
            throw error;
        }
        throw new Error('Network error. Please check your internet connection.');
    }
}

async function openweatherFetchForecast(cityName) {
    try {
        const response = await fetch(
            OPENWEATHER_API_BASE_URL + '/forecast?q=' + encodeURIComponent(cityName) + '&appid=' + OPENWEATHER_API_KEY + '&units=metric'
        );
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the city name and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else {
                throw new Error('Failed to fetch forecast data. Please try again later.');
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message) {
            throw error;
        }
        throw new Error('Network error. Please check your internet connection.');
    }
}

async function openweatherFetchAirPollution(lat, lon) {
    try {
        const response = await fetch(
            OPENWEATHER_API_BASE_URL + '/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=' + OPENWEATHER_API_KEY
        );
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

function openweatherFormatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function openweatherFormatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutesStr + ' ' + ampm;
}

function openweatherGetAirQualityText(aqi) {
    const qualityMap = {
        1: 'Good',
        2: 'Fair',
        3: 'Moderate',
        4: 'Poor',
        5: 'Very Poor'
    };
    return qualityMap[aqi] || 'Unknown';
}

// dito namn is yung function para mag display yung data na nafetch galing kay openweather sa html or website
function openweatherDisplayWeather(data, forecastData, airPollutionData) {
    const resultsElement = document.getElementById('openweather-results');
    if (!resultsElement) return;

    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A';
    const sunrise = openweatherFormatTime(data.sys.sunrise);
    const sunset = openweatherFormatTime(data.sys.sunset);
    const date = openweatherFormatDate(data.dt);

    let airQualityHtml = '';
    if (airPollutionData && airPollutionData.list && airPollutionData.list.length > 0) {
        const aqi = airPollutionData.list[0].main.aqi;
        const airQualityText = openweatherGetAirQualityText(aqi);
        airQualityHtml = '<div class="openweather-air-quality"><h3>Air Quality</h3><p class="openweather-aqi-value">' + airQualityText + ' (AQI: ' + aqi + ')</p></div>';
    }

    let forecastHtml = '';
    if (forecastData && forecastData.list) {
        const dailyForecasts = [];
        const seenDates = new Set();
        forecastData.list.forEach(item => {
            const dateStr = new Date(item.dt * 1000).toDateString();
            if (!seenDates.has(dateStr) && dailyForecasts.length < 5) {
                seenDates.add(dateStr);
                dailyForecasts.push(item);
            }
        });

        if (dailyForecasts.length > 0) {
            forecastHtml = '<div class="openweather-forecast-section"><h3>5-Day Forecast</h3><div class="openweather-forecast-grid">';
            dailyForecasts.forEach(item => {
                const forecastDate = openweatherFormatDate(item.dt);
                const forecastTemp = Math.round(item.main.temp);
                const forecastDesc = item.weather[0].description;
                forecastHtml += '<div class="openweather-forecast-card"><p class="openweather-forecast-date">' + forecastDate + '</p><p class="openweather-forecast-temp">' + forecastTemp + '°C</p><p class="openweather-forecast-desc">' + forecastDesc + '</p></div>';
            });
            forecastHtml += '</div></div>';
        }
    }

    resultsElement.innerHTML = '<div class="openweather-weather-card"><div class="openweather-weather-header"><h2>' + cityName + ', ' + country + '</h2><p class="openweather-date">' + date + '</p></div><div class="openweather-weather-main"><div class="openweather-temp-section"><p class="openweather-temp">' + temp + '°C</p><p class="openweather-feels-like">Feels like ' + feelsLike + '°C</p><p class="openweather-description">' + description + '</p></div><div class="openweather-details-grid"><div class="openweather-detail-item"><h4>Humidity</h4><p>' + humidity + '%</p></div><div class="openweather-detail-item"><h4>Wind Speed</h4><p>' + windSpeed + ' m/s</p></div><div class="openweather-detail-item"><h4>Pressure</h4><p>' + pressure + ' hPa</p></div><div class="openweather-detail-item"><h4>Visibility</h4><p>' + visibility + ' km</p></div><div class="openweather-detail-item"><h4>Sunrise</h4><p>' + sunrise + '</p></div><div class="openweather-detail-item"><h4>Sunset</h4><p>' + sunset + '</p></div></div>' + airQualityHtml + '</div></div>' + forecastHtml;
}

// dito naaman yung function para dun sa pag sesearch bale kinukuha lang yung laman ng search bar
async function openweatherHandleSearch() {
    const searchInput = document.getElementById('openweather-search-input');
    const searchBtn = document.getElementById('openweather-search-btn');
    
    if (!searchInput || !searchBtn) return;

    const cityName = searchInput.value.trim();
    
    const validation = openweatherValidateInput(cityName);
    if (!validation.valid) {
        openweatherShowError(validation.message);
        return;
    }

    openweatherClearError();
    openweatherShowLoading();
    openweatherSetButtonLoading(searchBtn, true);

    try {
        const weatherData = await openweatherFetchCurrentWeather(validation.query);
        const forecastData = await openweatherFetchForecast(validation.query);
        const airPollutionData = await openweatherFetchAirPollution(weatherData.coord.lat, weatherData.coord.lon);
        
        openweatherHideLoading();
        openweatherSetButtonLoading(searchBtn, false);
        openweatherDisplayWeather(weatherData, forecastData, airPollutionData);
    } catch (error) {
        openweatherHideLoading();
        openweatherSetButtonLoading(searchBtn, false);
        openweatherShowError(error.message);
    }
}

const openweatherSearchInput = document.getElementById('openweather-search-input');
const openweatherSearchBtn = document.getElementById('openweather-search-btn');

if (openweatherSearchBtn) {
    openweatherSearchBtn.addEventListener('click', openweatherHandleSearch);
}

if (openweatherSearchInput) {
    openweatherSearchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            openweatherHandleSearch();
        }
    });
}

