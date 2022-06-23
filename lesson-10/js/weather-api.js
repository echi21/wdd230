
// API key: daa8fefb9b8b808182b2ade02804a280
// city id for Fairbanks = 5861897
//const REQUEST_URL = "https://api.openweathermap.org/data/2.5/weather?id=5861897&appid=daa8fefb9b8b808182b2ade02804a280";

// select HTML elements to edit
const CURRENT_TEMP = document.querySelector('#current-temp');
const WEATHER_ICON = document.querySelector('#weather-icon');
const CAPTION_DESC = document.querySelector('figcaption');
const WEB_ADDRESS =
  "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=daa8fefb9b8b808182b2ade02804a280";
let weatherArray = [];

/*
* The result of parsing push event data as JSON, could be anything that can be represented
* by JSON — an object, an array, a string, a number...
*/
async function tryingToConvertResponseToJson(response) {
  if (response.ok) {
    //const jsonResult = await response.json();
    //console.log(jsonResult);
    //return jsonResult;
    return await response.json();
  } else {
    //console.log("Oh no! Something went WRONG:", response);
    throw Error(await response.text());
  }
}

function capitalize(string) {
  //split the above string into an array of strings whenever a blank space is encountered.
  let stringsArray = string.split(" ");
  //loop through each element of the array.
  for (let i = 0; i < stringsArray.length; i++) {
    // takes each word from the array.
    // takes the first letter and convert it to uppercase.
    // takes the same word.
    // split it from after the first letter and converting it to lowercase.
    // concatenates the first uppercase letter with the rest of the letter in lowercase.
    // finally, stores it in the array in the same position it was taken from.
    stringsArray[i] = `${stringsArray[i].charAt(0).toUpperCase()}${stringsArray[i].slice(1).toLowerCase()}`;
  }
  //Join all the elements of the array back into one string using a blank space as a separator and returns it.
  return stringsArray.join(" ");
}

function displayResults(weatherData) {
  CURRENT_TEMP.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  const ICON_SRC = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  const DESC = capitalize(weatherData.weather[0].description);

  WEATHER_ICON.setAttribute('src', ICON_SRC);
  WEATHER_ICON.setAttribute('alt', DESC);
  CAPTION_DESC.textContent = DESC;
}
// my version of fetch
async function main() {
  await fetch(WEB_ADDRESS)
    .then(tryingToConvertResponseToJson)
    .then((jsonResult) => {
      console.log(jsonResult);
      weatherArray = jsonResult;
      displayResults(weatherArray);
    });
}

//main();


// assignment proposition...
async function apiFetch() {
  try {
    const response = await fetch(WEB_ADDRESS);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
