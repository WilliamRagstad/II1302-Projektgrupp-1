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
async function generateTableContent(mac) {
    const URL1 = await API.Get('video/' + mac);
    var videos = [];
    URL1.forEach((item)=>videos.push({
            Date: new Date(item.Date).toLocaleDateString(),
            Video: item.URL
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
        const cell2 = row.insertCell();
        const text2 = window.document.createTextNode(element.Date);
        cell2.appendChild(text2);
        const cell3 = row.insertCell();
        const iframe = window.document.createElement("iframe");
        iframe.src = element.Video;
        cell3.appendChild(iframe);
    }
}
function searchID() {
    var query = window.document.getElementById('search-text').value;
    var table = window.document.querySelector("table");
    try {
        for(var i in table.rows){
            table.deleteRow(i);
        }
    } catch  {
        console.log("table cleaned");
    }
    createTable(query);
}
window.document.getElementById('search-text').addEventListener('keydown', (e)=>e.key == 'Enter' && searchID()
);
async function createTable(mac) {
    const table = window.document.querySelector("table");
    const videos = await generateTableContent(mac);
    const data = Object.keys(videos[0]);
    generateTableHead(table, data);
    generateTable(table, videos);
}
createTable("mac-1");