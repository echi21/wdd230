
const WEB_ADDRESS = "json/data.json";
const DIRECTORY_CARDS = document.querySelector("#directory-cards");
let templesArray = [];

// Using the built-in fetch method, calls this URL:
function main() {
  fetch(WEB_ADDRESS)
    .then(tryingToConvertResponseToJson)
    .then((jsonResult) => {
      //console.log(jsonResult);
      templesArray = jsonResult;
      renderContent(templesArray);
    });
}

/*
* The result of parsing push event data as JSON, could be anything that can be represented
* by JSON — an object, an array, a string, a number...
*/
function tryingToConvertResponseToJson(response) {
  if (response.ok) {
    let jsonResult = response.json();
    //console.log(jsonResult);
    return jsonResult;
  } else {
    console.log("Oh no! Something went WRONG:", response);
  }
}


function renderContent(templesArray) {
  templesArray.forEach((temple) => {
    let sectionElement = document.createElement("section");
    let h3Element = document.createElement("h3");
    let p1Element = document.createElement("p");
    let p2Element = document.createElement("p");
    let p3Element = document.createElement("p");
    let p4Element = document.createElement("p");
    let p5Element = document.createElement("p");
    let imgElement = document.createElement("img");
    let btnElement = document.createElement("button");
    btnElement.setAttribute("class", "like-me");

    h3Element.textContent = temple.name;
    p1Element.textContent = temple.address;
    p2Element.textContent = temple.phoneNumber;
    p3Element.textContent = temple.services;
    p4Element.textContent = temple.closureSchedule;
    p5Element.textContent = temple.history;
    btnElement.textContent = "LIKE";

    imgElement.setAttribute("src", temple.image);
    imgElement.setAttribute("alt", temple.name);


    if (window.localStorage.getItem(temple.id)) {
      if (window.localStorage.getItem(temple.id) === "yes") {
        btnElement.textContent = "YOU LIKE THIS";
      } else {
        btnElement.textContent = "LIKE"
      }
    }

    function calculateLike() {
      if (window.localStorage.getItem(temple.id) === "yes") {
        window.localStorage.setItem(temple.id, "no");
        btnElement.textContent = "LIKE"
      } else {
        window.localStorage.setItem(temple.id, "yes");
        btnElement.textContent = "YOU LIKE THIS";
      }
    }

    btnElement.addEventListener("click", () => {
      calculateLike();
    });

    sectionElement.appendChild(imgElement);
    sectionElement.appendChild(h3Element);
    sectionElement.appendChild(p1Element);
    sectionElement.appendChild(p2Element);
    sectionElement.appendChild(p3Element);
    sectionElement.appendChild(p4Element);
    sectionElement.appendChild(p5Element);
    sectionElement.appendChild(btnElement);

    DIRECTORY_CARDS.appendChild(sectionElement);
  });
}

main();
