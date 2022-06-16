/*********************************************************************************************************************/
/**
 * If this block of code is in any other place inside this file, it does not work. It needs to be at the beginning.
 */
// get all the img with data-src attribute
let imagesToLoad = document.querySelectorAll('img[data-src]');

// optional parameters being set for the IntersectionalObserver
const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px -30% 0px"
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

// first check to see if Intersection Observer is supported
if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if(item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions);

  // loop through each img and check status and load if necessary
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else { // just load all images if not supported...
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}

/*********************************************************************************************************************/
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
/*********************************************************************************************************************/

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
// setting the messages fot the different membership options for the join.html page
const nonProfit = `This is for non profit organizations and there is no fee. With this option you are welcome to read
and receive our news through your e-mail address.`;

const bronze = `This is an affordable option for those who want to experiment and not spend too much.
It has a monthly cost of $100. With it you have the right to receive professional advice for your business,
and during the month you can receive 3 training sessions, advertising on our site, and new newsletters.`;

const silver = `This is a prominent option for those who want higher profits. It has a monthly cost of $250.
With it you have the right to receive professional advice for your business 8 hours a day during working days,
and during the month you can receive 8 training sessions, 10 advertisements on our site, discounts on events,
4 scheduled access to our golf course, newsletters and much more.`;

const gold = `This is the best option for those who want all the benefits we have in our community. It has a
monthly cost of $400. With it you have the right to receive professional advice for your business 8 hours a day
throughout the week, and during the month you can receive all the training that is available, 30 advertisements
on our site, discounts on events, trips and purchases, free scheduled access to our golf course, credits for
investment, newsletters and much more.`;

const benefits = document.getElementById("benefits");
const radiosElements = document.getElementsByClassName("radios");
Array.from(radiosElements).forEach(radio => {
  radio.addEventListener("click", () => {
    switch (radio.getAttribute("value")) {
      case "np":
        benefits.innerText = nonProfit;
        break;
      case "bm":
        benefits.innerText = bronze;
        break;
      case "sm":
        benefits.innerText = silver;
        break;
      case "gm":
        benefits.innerText = gold;
        break;
    }
  })
});
//benefits.style.setProperty("text-align", "center");
/*********************************************************************************************************************/
/*
const formSubmittedTime = document.getElementById("date-time");
const submitButton = document.querySelector("#submit-btn");

submitButton.addEventListener("click", () => {
  formSubmittedTime.innerText = `${currentDate}`;
  console.log(formSubmittedTime.innerText);
});*/

/*********************************************************************************************************************/

// initialize display elements
const numVisitsID = document.getElementById("numb-visits-id");
const timeBetweenId = document.getElementById("time-between-id");

const calculateNumberOfVisits = () => {
  // gets the value associated with that key and parse it into a number.
  let value = Number(window.localStorage.getItem("discoverVisitsLs"));
  value++;
  // sets the new value in the same key stored in localStorage.
  window.localStorage.setItem("discoverVisitsLs",value.toString());
  // sets the value in the span element.
  numVisitsID.textContent = value.toString();
}

// if the item discoverVisits exists in the localStorage...
if (window.localStorage.getItem("discoverVisitsLs")) {
  // calls the previous arrow function.
  calculateNumberOfVisits();
} else {
  // if it doesn't exist, it creates it with an initial value of 1. Then sets a message in the span element
  window.localStorage.setItem("discoverVisitsLs", "1");
  numVisitsID.textContent = `This is your first visit!`;
}
/*********************************************************************************************************************/

// one day is equal to 86400000 milliseconds
const currentDateMilli = Date.now();

const calculateLastVisitDay = () => {
  // gets the value associated with that key and parse it into a number.
  const storedDateMilli = Number(window.localStorage.getItem("timeStampLs"));
  const daysSinceVisits = Math.round((currentDateMilli - storedDateMilli) / 86400000);
  timeBetweenId.textContent = daysSinceVisits.toString();
  window.localStorage.setItem("timeStampLs",currentDateMilli.toString());
}

// if the item timeStampLs exists in the localStorage...
if (window.localStorage.getItem("timeStampLs")) {
  // calls the previous arrow function.
  calculateLastVisitDay();
} else {
  // if it doesn't exist, it creates it with a default value. Then sets a message in the span element.
  window.localStorage.setItem("timeStampLs", currentDateMilli.toString());
  timeBetweenId.textContent = "0";
}

/*********************************************************************************************************************/
// gets the first span tag and sets the year.
document.querySelector("#year").textContent = year.toString();

// gets the second span tag and stored it.
let lastUpdate = document.querySelector("#updated-date");
// gets and stores a string containing the date and time on which the current document was last modified.
let lastChangeDate = document.lastModified;
// puts the previous information in the second span.
lastUpdate.textContent = `Last Modification: ${lastChangeDate}`;
