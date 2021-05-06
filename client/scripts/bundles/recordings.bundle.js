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
    const thead = table.createTHead();
    const row = thead.insertRow();
    data.forEach((key)=>{
        const th = window.document.createElement("th");
        const text = window.document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    });
}
function generateTable(table, data) {
    for (const element of data){
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const text1 = window.document.createTextNode(element.id);
        cell1.appendChild(text1);
        const cell2 = row.insertCell();
        const text2 = window.document.createTextNode(element.date);
        cell2.appendChild(text2);
        const cell3 = row.insertCell();
        const text3 = window.document.createTextNode(element.url);
        cell3.appendChild(text3);
    }
}
async function init() {
    const table = window.document.querySelector("table");
    const videos = await generateTableContent();
    const data = Object.keys(videos[0]);
    generateTableHead(table, data);
    generateTable(table, videos);
}
init();