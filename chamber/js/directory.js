
const WEB_ADDRESS = "json/data.json";
const CARDS = document.querySelector(".cards");
let companiesArray = [];
let id;

/*
document.querySelector("#zoo").addEventListener("click", () => {
  id = "#zoo";
  reset();
  main();
});

document.querySelector("#mocky").addEventListener("click", () => {
  id = "#mocky";
  reset();
  main();
});*/

/*
* The result of parsing push event data as JSON, could be anything that can be represented
* by JSON — an object, an array, a string, a number...
*/
function tryingToConvertResponseToJson(response) {
  if (response.ok) {
    let jsonResult = response.json();
    console.log(jsonResult);
    return jsonResult;
  } else {
    console.log("Oh no! Something went very WRONG:", response);
  }
}

function renderContent(companiesArray) {
  companiesArray.forEach(function (company) {
    let sectionElement = document.createElement("section");
    let h3Element = document.createElement("h3");
    let p1Element = document.createElement("p");
    let p2Element = document.createElement("p");
    let p3Element = document.createElement("p");
    let p4Element = document.createElement("p");
    let imgElement = document.createElement("img");

    h3Element.textContent = company.name;
    p1Element.textContent = company.address;
    p2Element.textContent = company.phoneNumber;
    p3Element.textContent = company.webAddress;
    p4Element.textContent = company.membershipLevel;
    imgElement.setAttribute("src", company.image);
    imgElement.setAttribute("alt", company.name);

    sectionElement.appendChild(imgElement);
    sectionElement.appendChild(h3Element);
    sectionElement.appendChild(p1Element);
    sectionElement.appendChild(p2Element);
    sectionElement.appendChild(p3Element);
    sectionElement.appendChild(p4Element);

    CARDS.appendChild(sectionElement);
  });
}

// Using the built-in fetch method, calls this URL:
function main() {
  fetch(WEB_ADDRESS)
    .then(tryingToConvertResponseToJson)
    .then((jsonResult) => {
      companiesArray = jsonResult;
      // console.log(animalsArray);
      //let ascendingArray = sortByCriterion(companiesArray);
      // console.log(ascendingArray);
      renderContent(companiesArray);
    });
}

main();
// Calls the reset function to clear the current content, get the value of the dropdown chosen, sort the Array
// and renders the new data on the screen.
/*function sortBy() {
  reset();
  let decision = document.querySelector("#sortBy").value;
  let sortedArray = sortByCriterion(companiesArray, decision);
  renderContent(sortedArray);
}

// Clears all the <article> elements from the HTML element with an ID of animals
function reset() {
  let parentElement = document.querySelector("#animals");
  parentElement.innerHTML = "";
}

function sortByCriterion(animalObjectsArray, decision="animalNameAscending") {
  const animalNamesArray = animalObjectsArray.map((oneAnimalObject) => oneAnimalObject.name);
  animalNamesArray.sort();
  if (decision === "animalNameDescending") {
    animalNamesArray.reverse();
  }
  return createOrdainedArray(animalNamesArray, animalObjectsArray);
}

function createOrdainedArray(animalNamesArray, animalObjectsArray) {
  const ordainedArray = [];
  animalNamesArray.forEach((name) => {
    animalObjectsArray.forEach((oneAnimalObject) => {
      if (oneAnimalObject.name === name) {
        ordainedArray.push(oneAnimalObject);
      }
    });
  });
  return ordainedArray;
}
*/
