// Global Variables
const JSON_FILE = "https://raw.githubusercontent.com/MobileSoftwareDevelopment/courses/dev/data/testData.json";

window.addEventListener("load", function () {

    readDataFromJson(JSON_FILE);
    let btn = document.getElementById("btnPrint");
    btn.addEventListener("click", printTableView);
});

function SearchTable() {
    let input = document.getElementById("search-courses").value.trim().toLowerCase();
    let table = document.getElementById("table");
    for (let row of table.rows) {
        if (row.rowIndex === 0) continue;
        let foundMatch = false;
        for (let cell of row.cells) {
            cell.style.backgroundColor = '#f8f8f8';
            cell.style.color = '#000000';
            if (input) {
                if (cell.innerText.toLowerCase().includes(input)) {
                    cell.style.backgroundColor = "rgba(168,168,168,0.2)";
                    cell.style.color = '#cc0033';
                    foundMatch = true;
                }
                row.style.display = foundMatch ? 'table-row' : 'none';
            } else {
                row.style.display = 'table-row';
            }
        }
    }
}

function readDataFromJson(path) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let jsonObject;
            try {
                jsonObject = JSON.parse(this.responseText);
                console.log(jsonObject.length);
            } catch (e) {
                console.log("Couldn't read json file. Error: " + e);
                return;
            }
            buildTable(jsonObject);
        }
    };
    request.open("GET", path, true);
    request.send();
}

function addHeaders(table, keys) {
    let header = table.createTHead();
    let row = header.insertRow();
    for (let i = 0; i < keys.length; i++) {
        let cell = row.appendChild(document.createElement("th"));
        cell.appendChild(document.createTextNode(keys[i]));
        cell.className = "table-header";
        cell.setAttribute("scope", "col");
    }
}

function buildTable(jsonObject) {
    let attributes = [
        "Unitcode",
        "Name",
        "Typ",
        "Modul",
        "SWS",
        "ECTS",
        "Semester",
        "Wahlpflicht",
        "Studium",
        "Lehrender"
    ];
    let table = document.createElement("table");
    table.id = "table";
    let tbody = table.appendChild(document.createElement("tbody"));

    for (let i = 0; i < jsonObject.length; i++) {
        let course = jsonObject[i];
        if (i === 0) {
            addHeaders(table, Object.keys(course));
        }

        let row = tbody.insertRow();
        let counter = 0;
        for (const k of Object.keys(course)) {
            counter++;

            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(course[k]));


            // Format Wahlpflichtfach
            switch (cell.innerText.toLowerCase()) {
                case "true":
                    cell.innerText = "Ja";
                    break;
                case "false":
                    cell.innerText = "Nein";
            }

            if (counter === 0) {
                cell.setAttribute("scope", "row");
            }
            cell.setAttribute("data-label", attributes[counter]);
        }

    }
    document.getElementById("container").appendChild(table);
}


function printTableView() {
    window.print();
}
