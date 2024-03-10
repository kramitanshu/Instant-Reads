const inputElm = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");

const ListElm = document.getElementById("ul-el");

let currReads = [];

const readsFromLocalStorage = JSON.parse(localStorage.getItem("currReads"));

// If reads are their render it
if (readsFromLocalStorage) {
  currReads = readsFromLocalStorage;
  render(currReads);
}

function render(reads) {
  let readsItems = "";
  for (let i = 0; i < reads.length; i++) {
    readsItems += `
    <li>
      <a href="${reads[i]}" target="_blank">${reads[i]} </a> 
    </li>
    `;
  }
  ListElm.innerHTML = readsItems;
}

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // taking value from input field
  let newRead = inputElm.value;
  inputElm.value = "";
  currReads.push(newRead);

  // Settign leads in local storage
  currReads = JSON.stringify(currReads);
  localStorage.setItem("currReads", currReads);
  currReads = JSON.parse(localStorage.getItem("currReads"));

  // render it
  render(currReads);
});

deleteBtn.addEventListener("dblclick", (e) => {
  e.preventDefault();

  // clear all data
  localStorage.clear();
  currReads = [];

  // render it
  render(currReads);
});

tabBtn.addEventListener("click", (e) => {
  // e.preventDefault()
  // Taking URL of current Tab (Using chorme API)
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Got the data
    const data = tabs[0].url;
    currReads.push(data);

    // pushed inside localstorage
    localStorage.setItem("currReads", JSON.stringify(currReads));

    // render it
    render(currReads);
  });
});
