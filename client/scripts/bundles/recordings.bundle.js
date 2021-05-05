const API = {
    Get: async function(endpoint) {
        const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
        if (response.status !== 200) return false;
        try {
            return await response.json();
        } catch (error) {
            return await response.text();
        }
    }
};
async function generateTableContent() {
    const URL1 = await API.Get('video/88:88:88:88');
    var videos = [];
    URL1.forEach((item)=>videos.push({
            id: "88:88:88",
            date: "hej",
            url: item
        })
    );
    return videos;
}
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    data.forEach((key)=>()=>{
            let th = window.document.createElement("th");
            let text = window.document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    );
}
function generateTable(table, data) {
    for (let element of data){
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
async function init() {
    let table = window.document.querySelector("table");
    let videos = await generateTableContent();
    let data = Object.keys(videos[0]);
    generateTableHead(table, data);
    generateTable(table, videos);
}
init();