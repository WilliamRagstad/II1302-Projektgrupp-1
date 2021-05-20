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
		videos.push({ Date: new Date((item.Date)).toLocaleDateString(), Video: item.URL })
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

		const cell2 = row.insertCell();
		const text2 = window.document.createTextNode(element.Date);
		cell2.appendChild(text2);

		const cell3 = row.insertCell();
		const iframe = window.document.createElement("iframe");
		iframe.src = element.Video;
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

window.document.getElementById('search-text').addEventListener('keydown', (e: any) => e.key == 'Enter' && searchID());

async function createTable(mac:any){
	const table = window.document.querySelector("table");
	const videos = await generateTableContent(mac);
	if (!videos || videos.length == 0) return;
	const data = Object.keys(videos[0]);
	generateTableHead(table, data);
	generateTable(table, videos);
}
//mac-1 is a placeholder, supposed to be ""
createTable("mac-1");
