


function generateTableContent(){
	const URL = await API.Get('video/mac-1');
	var videos = [];
	
	URL.forEach(item => 
		videos.push({id: 88:88:88, url: item})
	)
	return videos;
}


//generates the head of the table
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

//generates the table formate and adds data into the cells
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
generateTable(table, generateTableContent());




