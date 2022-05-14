
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

const currentDate = new Date();
const dayName = dayNames[currentDate.getDay()];
const monthName = monthNames[currentDate.getMonth()];
const year = currentDate.getFullYear();
const numberDay = currentDate.getDate();

document.getElementById("current-date").textContent = `${dayName}, ${numberDay} ${monthName}, ${year}`;
/*currentDateSpan = `${dayName}, ${monthName}, ${year}`;*/

console.log();






function toggleMenu() {
  document.getElementById("primary-nav").classList.toggle("open");
  document.getElementById("hamburger-btn").classList.toggle("open");
}

const x = document.getElementById("hamburger-btn");
x.onclick = toggleMenu;
