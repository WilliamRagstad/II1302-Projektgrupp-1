import { API } from './api.ts';

declare global {
	interface Window {
		document: any
	}
}

async function generateTableContent(){
	const URL = await API.Get('video/88:88:88:88');
	var videos:any[] = [];

	URL.forEach((item:any) =>
		videos.push({id: "88:88:88", date:"hej", url: item})
	)
	return videos;
}


//generates the head of the table
function generateTableHead(table:any, data:any) {
  let thead = table.createTHead();
  let row = thead.insertRow();
	data.forEach((key:any) => ()=>{
		let th = window.document.createElement("th");
    let text = window.document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
		}
	)
}

//generates the table formate and adds data into the cells
function generateTable(table:any, data:any) {
  for (let element of data) {
    let row = table.insertRow();

		let cell = row.insertCell();
		let text1 = window.document.createTextNode(element.id);
		let text2 = window.document.createTextNode(element.date);
		let text3 = window.document.createTextNode(element.url);
		cell.appendChild(text1);
		cell.appendChild(text2);
		cell.appendChild(text3);
		}
	}


async function init(){
let table = window.document.querySelector("table");
let videos = await generateTableContent();
let data = Object.keys(videos[0]);
generateTableHead(table, data);
generateTable(table, videos);
}
init();
