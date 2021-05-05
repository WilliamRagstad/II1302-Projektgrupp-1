
let videos = [
	{id: "11:12:11:11", date: "12/11/2019", url: "blaha8"},
	{id: "11:11:11:18", date: "12/11/2010", url: "blaha9"},
	{id: "00:11:11:11", date: "10/11/2012", url: "blaha10"},
	{id: "11:23:11:16", date: "09/11/2012", url: "blaha11"},
	{id: "22:11:11:11", date: "08/11/2012", url: "blaha12"},
	{id: "33:11:11:11", date: "07/11/2012", url: "blaha13"},
	{id: "11:00:11:10", date: "06/11/2012", url: "blaha14"}
];


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(videos[0]);
generateTableHead(table, data);
generateTable(table, videos);




