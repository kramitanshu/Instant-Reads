let myLeads = [];
let oldLeads = [];
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
// const leadEl = document.getElementById("leads-el")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")


// console.log(deleteBtn)
// console.log(ulEl)

// Getting leads from localstorage
// localStorage.clear()
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));
// console.log(leadsFromLocalStorage);

// const tabs = [
// 	{ url :"https://codeforces.com/"}
// ]


tabBtn.addEventListener("click", function () {

	// Grab current URL of data ( Using chrome API)
	// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 	console.log(tabs)

	// });
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// console.log(tabs);
		const data = tabs[0].url;
		myLeads.push(data);
		localStorage.setItem("myleads", JSON.stringify(myLeads));
		render(myLeads);
	})

	// console.log(tabs[0].url);

})

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads)
}

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++){
		// listItems += "<li><a target='_blank' href='" + myLeads[i] + "'> " + myLeads[i] + " </a></li>";   // ----------- Complecated string
		listItems +=
			`
				<li>
					<a  href="${leads[i]}" target="_blank">
						${leads[i]}
					</a>
				</li>
			`
		// console.log(listItems);

	}
	ulEl.innerHTML = listItems;
}















// Render the leads in the unordered list using ulEL.textcontent

// function saveLead() {
	// 	console.log("Button Clicked")
	// }

	// prompt()
	// .value()

	// This one is good !!
	inputBtn.addEventListener("click", function () {
		let lead = inputEl.value;
		myLeads.push(lead);
		console.log(myLeads);
		// Clear out the input field

		// ---- Local storage     // -- Setting leads in local storage
		myLeads = JSON.stringify(myLeads);
		localStorage.setItem("myleads", myLeads);
		myLeads = JSON.parse(myLeads);


		render(myLeads)
		// inputEl.reset()			// --------- What this does ??
		inputEl.value = "";        // ----- This works !!
		// display()
		// console.log(localStorage.getItem("myleads"))
	})

	// function display() {

		// for (let i = 0; i < myLeads.length; i++){
			// 	ulEl.textContent += myLeads[i]  + " ";
	// }
// }





// Listen double click on the delete button
// when clicked, clear localstorage, myLeads and DOM
deleteBtn.addEventListener("dblclick", function () {
	localStorage.clear()
	myLeads = ""
	render(myLeads);
	// console.log("double click");
})


// let listItems = "";

// for (let i = 0; i < myLeads.length; i++){
	// 	// ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
	// 	listItems += "<li>" + myLeads[i] + "</li>";


	// // this one is Good -----------------------
	// // create element
	// const li = document.createElement("li")
	// // set text content
	// li.textContent = myLeads[i]
	// // Append to unordered list
	// ulEl.append(li)
// }
// ulEl.innerHTML = listItems;
