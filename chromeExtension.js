let myLeads = [];

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const markedDeleteBtn = document.getElementById("marked-delete-btn")
// const leadEl = document.getElementById("leads-el")
const ulEl = document.getElementById("ul-el")

// Getting leads from localstorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));

tabBtn.addEventListener("click", function () {

	// Grab current URL of data ( Using chrome API)
	// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 	console.log(tabs)

	// });
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// console.log(tabs);
		const data = tabs[0].url;
		const newRead = {data, checked: false}
		myLeads.push(newRead);
		localStorage.setItem("myleads", JSON.stringify(myLeads));
		render(myLeads);
	})
})

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads)
}

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++){
		
		// listItems += "<li><a target='_blank' href='" + myLeads[i] + "'> " + myLeads[i] + " </a></li>";   // ----------- Complecated string

		// here I need to add check box, and event listener on check box, so that it modifies it's value
		if(!leads[i].checked){
			listItems +=
				`
					<li>
						<a  href="${leads[i].value}" target="_blank">
							${leads[i].value}
						</a>
					</li>
				`

		}
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
		let value = inputEl.value;
		// technically alert
		if(value === "") return  
		let lead = {value, checked: false};
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
	myLeads = []
	render(myLeads);
	// console.log("double click");
})

markedDeleteBtn.addEventListener("click", (e) =>{
	e.preventDefault();
	console.log("button clicked")
	// const data = JSON.parse(localStorage.getItem("myLeads"));
	const modifiedLead = [];
	// localStorage.clear();
	// myLeads = [];

	for(let i = 0; i<myLeads.length; i++){
		if(!myLeads[i].checked){
			modifiedLead.push(myLeads[i]);
		}
	}
	myLeads = modifiedLead;
	localStorage.clear();
	localStorage.setItem("myleads", JSON.stringify(myLeads))
	console.log(myLeads);
	render(myLeads);
})

render(myLeads)


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
