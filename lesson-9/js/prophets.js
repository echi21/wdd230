
const REQUEST_URL = "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";
const CARDS = document.querySelector(".cards");

fetch(REQUEST_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const PROPHETS = jsonObject["prophets"];
    PROPHETS.forEach(displayProphets);
  });

function displayProphets(prophet) {
  // Create elements to add to the document
  let card = document.createElement("section");
  let h2 = document.createElement("h2");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let portrait = document.createElement("img");

  // Change the textContent property of the h2 element to contain the prophet's full name
  h2.textContent = `${prophet.name} ${prophet.lastname}`;
  p1.textContent = `Date of Birth: ${prophet.birthdate}`;
  p2.textContent = `Place of Birth: ${prophet.birthplace}`;
  p2.style.setProperty("font-style", "italic");

  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values.
  // (Fill in the blank with the appropriate variable).
  portrait.setAttribute("src", prophet.imageurl);
  portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname} -
  ${prophet.order}th Latter-day President`);
  portrait.setAttribute("loading", "lazy");

  // Add/append the section(card) with the h2 element
  card.appendChild(h2);
  card.appendChild(p1);
  card.appendChild(p2);
  card.appendChild(portrait);

  // Add/append one new HTML <section> to the <div> container for all the sections.
  CARDS.appendChild(card);
}
