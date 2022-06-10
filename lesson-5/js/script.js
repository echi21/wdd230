
const ulTag = document.querySelector(".list");
const inputTag = document.querySelector("#fav-chap");
const buttonTag = document.querySelector("#submit-button");

buttonTag.addEventListener("click", () => {
  let inputValue = inputTag.value;
  if (inputValue.trim() === "") {
    alert("Empty field not allowed. You must insert a value in order to save it");
  } else {
    inputTag.value = "";
    let liElement = document.createElement("li");
    let spanElement = document.createElement("span");
    let buttonElement = document.createElement("button");
    liElement.appendChild(spanElement);
    liElement.appendChild(buttonElement);
    spanElement.textContent = inputValue;
    buttonElement.textContent = "X";
    buttonElement.style.color = "red";
    buttonElement.setAttribute("arial-label", "Remove this book and chapter");

    ulTag.appendChild(liElement);

    buttonElement.addEventListener("click", () => {
      ulTag.removeChild(liElement);
      inputTag.focus();
    });
  }
  inputTag.focus();
});
