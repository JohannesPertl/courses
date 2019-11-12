// Global variables
var JSON_FILE = "./data/testData.json";


window.addEventListener("load", function () {
    readDataFromJson(JSON_FILE);

    var btn = document.getElementById("btnPrint");
    btn.addEventListener("click", printTableView);

});


function readDataFromJson(path) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsonObject = JSON.parse(this.responseText);
            console.log(jsonObject[0].unitcode);
            console.log(jsonObject);
            buildTable(jsonObject);
        }
    };
    request.open("GET", path, true);
    request.send();
}



function addHeaders(table, keys) {
    var row = table.insertRow();
    for (var i = 0; i < keys.length; i++) {
        var cell = row.insertCell();
        cell.appendChild(document.createTextNode(keys[i]));
    }
}


function buildTable(jsonObject) {
    var table = document.createElement('table');
    for (var i = 0; i < jsonObject.length; i++) {

        var course = jsonObject[i];
        if (i === 0) {
            addHeaders(table, Object.keys(course));
        }
        var row = table.insertRow();
        Object.keys(course).forEach(function (k) {
            console.log(k);
            var cell = row.insertCell();
            cell.appendChild(document.createTextNode(course[k]));
        })
    }
    document.getElementById('container').appendChild(table);
}

function printTableView() {
    window.print();
}




