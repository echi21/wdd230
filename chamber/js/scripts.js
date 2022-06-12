
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// creates a Date object and gets the current year.
const currentDate = new Date();
const dayName = dayNames[currentDate.getDay()];
const monthName = monthNames[currentDate.getMonth()];
const year = currentDate.getFullYear();
const numberDay = currentDate.getDate();

document.getElementById("current-date").textContent = `${dayName}, ${numberDay} ${monthName}, ${year}`;
/********************************************************************************************************************/

// Displays a banner on Mondays or Tuesdays only at the very top of the page
let banner = document.querySelector(".banner");
if (dayName.toLowerCase() === "monday" || dayName.toLowerCase() === "tuesday") {
  banner.style.display = "block";
}

/********************************************************************************************************************/
//Toggle the menu when the web page is in small size
function toggleMenu() {
  document.getElementById("secondary-nav").classList.toggle("open");
  document.getElementById("hamburger-btn").classList.toggle("open");
}

const x = document.getElementById("hamburger-btn");
x.onclick = toggleMenu;
/*********************************************************************************************************************/
const mess = document.getElementById("labels");
console.log(mess);







/*********************************************************************************************************************/
// gets the first span tag and sets the year.
document.querySelector("#year").textContent = year.toString();

// gets the second span tag and stored it.
let lastUpdate = document.querySelector("#updated-date");
// gets and stores a string containing the date and time on which the current document was last modified.
let lastChangeDate = document.lastModified;
// puts the previous information in the second span.
lastUpdate.textContent = `Last Modification: ${lastChangeDate}`;
