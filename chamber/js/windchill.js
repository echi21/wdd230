
// city ID for Balcarce = 3436177
// select HTML elements to edit
const CURRENT_TEMP = document.querySelector('#temperature');
const PICTURE_SOURCE = document.querySelector("#temperature-unit source");
const DESC_PARAGRAPH = document.querySelector("#weather-comment");
const WIND_SPEED = document.querySelector("#wind-speed");
const WIND_CHILL = document.querySelector("#wind-chill");
const WEB_ADDRESS = "https://api.openweathermap.org/data/2.5/weather?id=3436177&appid=daa8fefb9b8b808182b2ade02804a280&units=imperial";
let celsiusTemp, weatherIcon, weatherDescription, kphWindSpeed, celsiusWindChillOrValue;
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
  let upperArray = "";
  let stringsArray = string.split(" ");
  stringsArray.forEach(word => {
    upperArray += `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()} `;
  });
  return upperArray;
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
    return CONVERT_FAH_TO_CEL(FAHRENHEIT_WIND_CHILL(fahTemp, mphSpeed)).toFixed(0);
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
  celsiusWindChillOrValue = checkIfWindChillCorresponds(apiFahTemp, apiMphSpeed);
}
/*-------------------------------------------------------------------------------------------------------------------*/
function renderContent() {
  PICTURE_SOURCE.setAttribute("srcset", weatherIcon);
  CURRENT_TEMP.innerHTML = `<strong>${celsiusTemp.toFixed(0)}</strong>`;
  DESC_PARAGRAPH.innerHTML = `<strong>${weatherDescription}</strong>`;
  WIND_SPEED.textContent = kphWindSpeed.toFixed(1);
  WIND_CHILL.textContent = celsiusWindChillOrValue;
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
/*-------------------------------------------------------------------------------------------------------------------*/


const COMPANIES_URL = "json/data.json";
const SPOTS_BOX = document.querySelector("#spots-box");
let companiesArray = [];
let indexesArray = [];
let twoCompanies = [];
/*
* The result of parsing push event data as JSON, could be anything that can be represented
* by JSON — an object, an array, a string, a number...
*/
function tryingToConvertResponseToJson2(response) {
  if (response.ok) {
    let jsonResult = response.json();
    console.log(jsonResult);
    return jsonResult;
  } else {
    console.log("Oh no! Something went WRONG:", response);
  }
}

function getRandomIntNumberFromZeroToLessThan(number) {
  return Math.floor(Math.random() * number);
}

function setTwoDifferentIndexNumbersToArray() {
  indexesArray.push(getRandomIntNumberFromZeroToLessThan(9));
  let currentIndex = getRandomIntNumberFromZeroToLessThan(9);

  while (indexesArray.includes(currentIndex)) {
    currentIndex = getRandomIntNumberFromZeroToLessThan(9);
  }
  indexesArray.push(currentIndex);
}

function getTwoRandomCompanies(companiesArray) {
  setTwoDifferentIndexNumbersToArray();
  twoCompanies = indexesArray.map(index => {
    return companiesArray[index];
  });
}
//console.log(twoCompanies);

function renderContent2(someCompaniesArray) {
  someCompaniesArray.forEach((company) => {
    let divElement = document.createElement("div");
    let h2Element = document.createElement("h2");
    let p1Element = document.createElement("p");
    let p2Element = document.createElement("p");
    let p3Element = document.createElement("p");
    let p4Element = document.createElement("p");
    let aElement = document.createElement("a");
    let imgElement = document.createElement("img");

    h2Element.textContent = company.name;
    p1Element.textContent = company.address;
    p2Element.textContent = company.phoneNumber;
    p3Element.textContent = company.membershipLevel;

    aElement.setAttribute("href", company.webAddress);
    aElement.setAttribute("target", "_blank");
    aElement.textContent = `Go to Website`;
    p4Element.appendChild(aElement);

    imgElement.setAttribute("src", company.image);
    imgElement.setAttribute("alt", company.name);

    divElement.appendChild(imgElement);
    divElement.appendChild(h2Element);
    divElement.appendChild(p1Element);
    divElement.appendChild(p2Element);
    divElement.appendChild(p3Element);
    divElement.appendChild(p4Element);

    SPOTS_BOX.appendChild(divElement);
  });
}

// Using the built-in fetch method, calls this URL:
function main2() {
  fetch(COMPANIES_URL)
    .then(tryingToConvertResponseToJson2)
    .then((jsonResult) => {
      console.log(jsonResult);
      companiesArray = jsonResult;
      getTwoRandomCompanies(companiesArray);
      renderContent2(twoCompanies);
    });
}

main2();
