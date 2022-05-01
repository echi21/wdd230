
// creates a Date object and gets the current year.
const date = new Date();
const year = date.getFullYear();

// gets the first span tag and sets the year.
document.querySelector("#year").textContent = year;

// gets the second span tag and stored it.
let lastUpdate = document.querySelector("#updated-date");
// gets and stores a string containing the date and time on which the current document was last modified.
let lastChangeDate = document.lastModified;
// puts the previous information in the second span.
lastUpdate.textContent = `Last Updated: ${lastChangeDate}`;
