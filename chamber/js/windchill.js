
// city ID for Balcarce = 3436177
// select HTML elements to edit
const CURRENT_TEMP = document.querySelector('#temperature');
const PICTURE_SOURCE = document.querySelector("#temperature-unit source");
const DESC_PARAGRAPH = document.querySelector("#weather-comment");
const WIND_SPEED = document.querySelector("#wind-speed");
const WIND_CHILL = document.querySelector("#wind-chill");
const WEB_ADDRESS = "https://api.openweathermap.org/data/2.5/weather?id=3436177&appid=daa8fefb9b8b808182b2ade02804a280&units=imperial";
let celsiusTemp, weatherIcon, weatherDescription, kphWindSpeed, celsiusWindChill;
/*-------------------------------------------------------------------------------------------------------------------*/
// The result of parsing push event data as JSON, could be anything that can be represented by JSON — an object,
// an array, a string, a number...
async function tryingToConvertResponseToJson(response) {
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.text());
  }
}
/*-------------------------------------------------------------------------------------------------------------------*/
// Converts the temperature from Fahrenheit to Celsius (°F − 32) / 1.8 = °C
const CONVERT_FAH_TO_CEL = (fahTemp) => (fahTemp - 32) / 1.8;
/*-------------------------------------------------------------------------------------------------------------------*/
function capitalize(string) {
  //split a string into an array of strings whenever a blank space is encountered.
  let stringsArray = string.split(" ");
  //loop through each element of the array.
  for (let i = 0; i < stringsArray.length; i++) {
    /* Takes each word from the array. Takes the first letter and convert it to uppercase. Takes the same word. Splits
    it from after the first letter and converting it to lowercase. Concatenates the first uppercase letter with the
    rest of the letter in lowercase. Finally, stores it in the array in the same position it was taken from.*/
    stringsArray[i] = `${stringsArray[i].charAt(0).toUpperCase()}${stringsArray[i].slice(1).toLowerCase()}`;
  }
  //Join all the elements of the array back into one string using a blank space as a separator and returns it.
  return stringsArray.join(" ");
}
/*-------------------------------------------------------------------------------------------------------------------*/
// Converts the speed from miles to km (time conversion is not necessary). 1 mi = 1609.344 m = 1.609344 km
const CONVERT_MPH_TO_KPH = (mph) => mph * 1.609344;
/*-------------------------------------------------------------------------------------------------------------------*/
const FAHRENHEIT_WIND_CHILL = (farTemp, mphSpeed) =>
  35.74 + (0.6215 * farTemp) - (35.75 * (mphSpeed ** 0.16)) + (0.4275 * (farTemp * (mphSpeed ** 0.16)));
/*-------------------------------------------------------------------------------------------------------------------*/
//check if wind chill conditions are met
function checkIfWindChillCorresponds(fahTemp, mphSpeed) {
  if (fahTemp <= 50 && mphSpeed > 3.0) {
    return CONVERT_FAH_TO_CEL(FAHRENHEIT_WIND_CHILL(fahTemp, mphSpeed));
  } else {
    return "N/A";
  }
}
/*-------------------------------------------------------------------------------------------------------------------*/
function calculateAndSetValues(weatherData) {
  let apiFahTemp = weatherData.main.temp;
  let apiMphSpeed = weatherData.wind.speed;
  weatherIcon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  celsiusTemp = CONVERT_FAH_TO_CEL(apiFahTemp);
  weatherDescription = capitalize(weatherData.weather[0].description);
  kphWindSpeed = CONVERT_MPH_TO_KPH(apiMphSpeed);
  celsiusWindChill = checkIfWindChillCorresponds(apiFahTemp, apiMphSpeed);
}
/*-------------------------------------------------------------------------------------------------------------------*/
function renderContent() {
  PICTURE_SOURCE.setAttribute("srcset", weatherIcon);
  CURRENT_TEMP.innerHTML = `<strong>${celsiusTemp.toFixed(0)}</strong>`;
  DESC_PARAGRAPH.innerHTML = `<strong>${weatherDescription}</strong>`;
  WIND_SPEED.textContent = kphWindSpeed.toFixed(1);
  WIND_CHILL.textContent = celsiusWindChill.toFixed(0);
}
/*-------------------------------------------------------------------------------------------------------------------*/
async function main() {
  try {
    await fetch(WEB_ADDRESS)
    .then(tryingToConvertResponseToJson)
    .then((jsonResult) => {
      console.log(jsonResult);
      calculateAndSetValues(jsonResult);
      renderContent();
    });
  } catch (error) {
    console.log(error);
  }
}

main();
