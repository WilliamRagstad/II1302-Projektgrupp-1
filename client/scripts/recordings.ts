import { API } from './api.ts';

declare global {
	interface Window {
		document: any
	}
}

async function generateTableContent(mac:any){
	const URL = await API.Get('video/'+mac);
	var videos: any[] = [];

	URL.forEach((item: any) =>
		videos.push({ MAC: mac, Date: new Date().toDateString(), Link: item })
	)
	return videos;
}

//generates the head of the table
function generateTableHead(table: any, data: any) {
	const thead = table.createTHead();
	const row = thead.insertRow();
	data.forEach((key: any) => {
		const th = window.document.createElement("th");
		const text = window.document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	})
}

//generates the table formate and adds data into the cells
function generateTable(table: any, data: any) {
	for (const element of data) {
		const row = table.insertRow();

		const cell1 = row.insertCell();
		const text1 = window.document.createTextNode(element.MAC);
		cell1.appendChild(text1);

		const cell2 = row.insertCell();
		const text2 = window.document.createTextNode(element.Date);
		cell2.appendChild(text2);

		const cell3 = row.insertCell();
		const iframe = window.document.createElement("iframe");
		iframe.src = element.Link;
		cell3.appendChild(iframe);
	}
}
export function searchID(){
	var query = window.document.getElementById('search-text').value;
	var table = window.document.querySelector("table")
	try {
	for(var i in table.rows) {	table.deleteRow(i)	}
	} catch {console.log("table cleaned")}
	createTable(query);
}

async function createTable(mac:any){
	const table = window.document.querySelector("table");
	const videos = await generateTableContent(mac);
	const data = Object.keys(videos[0]);
	generateTableHead(table, data);
	generateTable(table, videos);
}
//88:88:88:88 is a placeholder, supposed to be ""
createTable("88:88:88:88");
