# Weather App - OpenWeatherMap API

## API Documentation

### Base URL
https://api.openweathermap.org/data/2.5

### Endpoints

1. Current Weather
Endpoint: /weather
Method: GET
Description: Fetches current weather data for a specific city

2. Weather Forecast
Endpoint: /forecast
Method: GET
Description: Fetches 5-day weather forecast data for a specific city

3. Air Pollution
Endpoint: /air_pollution
Method: GET
Description: Fetches air quality and pollution data based on coordinates

### Required Parameters

Current Weather Endpoint:
- q: City name (string, required)
- appid: API key (string, required)
- units: Temperature units - metric for Celsius (string, optional)

Forecast Endpoint:
- q: City name (string, required)
- appid: API key (string, required)
- units: Temperature units - metric for Celsius (string, optional)

Air Pollution Endpoint:
- lat: Latitude coordinate (number, required)
- lon: Longitude coordinate (number, required)
- appid: API key (string, required)

### Authentication
API Key
The API requires an API key for authentication. The key must be included in the appid parameter for all requests.

### Sample JSON Response

Current Weather Response:
{
  "coord": {
    "lon": 120.9842,
    "lat": 14.6042
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "main": {
    "temp": 32.5,
    "feels_like": 38.2,
    "temp_min": 30.1,
    "temp_max": 34.8,
    "pressure": 1010,
    "humidity": 65
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.2
  },
  "sys": {
    "sunrise": 1700000000,
    "sunset": 1700040000,
    "country": "PH"
  },
  "name": "Manila",
  "dt": 1700020000
}

Forecast Response:
{
  "list": [
    {
      "dt": 1700020000,
      "main": {
        "temp": 32.5,
        "humidity": 65
      },
      "weather": [
        {
          "description": "few clouds"
        }
      ]
    }
  ]
}

Air Pollution Response:
{
  "list": [
    {
      "main": {
        "aqi": 2
      }
    }
  ]
}

### Fetch the Data (JavaScript)

The application uses fetch() with async/await pattern to retrieve weather data. The main functions that handle API calls are:

- openweatherFetchCurrentWeather: Fetches current weather data for a city
- openweatherFetchForecast: Fetches 5-day forecast data for a city
- openweatherFetchAirPollution: Fetches air quality data using coordinates

All functions use try-catch blocks for error handling and return promises that resolve with the API response data.

### Display in HTML (DOM)

The weather data is displayed using:
- Cards: Main weather information is shown in a card layout
- Grid: Weather details and forecast are displayed in responsive grid layouts
- Lists: Forecast data is organized in a grid of forecast cards

### Error Handling

The application includes comprehensive error handling for:
- No results found: Displays error message when city is not found (404 error)
- Invalid input: Validates city name before making API request
- Failed API call: Handles network errors and API errors with user-friendly messages
- Loading message: Shows loading spinner and text while fetching data

### Input Validation

The application validates user input by:
- Checking empty fields: Ensures city name is not empty
- Checking invalid characters: Prevents special characters that could cause issues
- Disabling button while loading: Prevents multiple simultaneous requests
- Auto-trim whitespace: Removes leading and trailing spaces from input

### Loading State

The application displays loading indicators:
- Loading text: Shows "Loading..." message
- Loading spinner: Displays animated spinner during API calls
- Button state: Search button shows "Searching..." and is disabled during requests

### Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes from 320px to 1920px and above

The layout adapts using CSS media queries for different breakpoints:
- 768px and below: Adjusts grid layouts and font sizes for tablets
- 480px and below: Optimizes for mobile phones with single column layouts

### Comments in Code

The JavaScript file includes 5 Tagalog comments explaining important functions:
- Input validation function
- API fetch functions
- Display function
- Error handling functions

### File Requirements

The project includes exactly 4 files:
1. index.html - Main HTML structure
2. style.css - All styling and responsive design
3. script.js - All JavaScript functionality
4. config.js - API key configuration

No inline CSS or JavaScript is used in the HTML file.

### Code Organization

The code is organized using functions only:
- API functions: Handle all API requests
- DOM functions: Handle all display and UI updates
- Utility functions: Handle validation, formatting, and helper operations
- Event handlers: Handle user interactions

No constructors, classes, or initialization functions are used.

### UI Requirements

The interface includes:
- Search bar: Input field for entering city names
- Buttons: Search button to trigger weather lookup
- Results container: Displays weather information and forecast
- Error container: Shows error messages when something goes wrong
- Footer: Contains credits and link to OpenWeatherMap API

### API Key Security

The API key is stored in config.js file:
- File is imported in index.html
- Key placeholder is "YOUR_API_KEY_HERE"
- File should not be committed to GitHub with actual API key
- Users must replace placeholder with their own API key from OpenWeatherMap

### How to Run the Project

1. Get an API key from OpenWeatherMap:
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Generate an API key

2. Configure the API key:
   - Open config.js file
   - Replace "YOUR_API_KEY_HERE" with your actual API key

3. Open the website:
   - Open index.html in a web browser
   - Or use a local web server

4. Use the application:
   - Enter a city name in the search box
   - Click Search button or press Enter
   - View weather information and forecast

### Features

- Current weather display with temperature, humidity, wind speed, pressure, visibility
- Sunrise and sunset times
- Air quality index when available
- 5-day weather forecast
- Responsive design for all devices
- Loading states and error handling
- Input validation

