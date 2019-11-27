/**
 * Global variables
 */
const JSON_FILE = "data/testData.json";

/**
 * Calls functions after the page has fully loaded
 */
window.addEventListener("load", function() {
  readDataFromJson(JSON_FILE);
  let btn = document.getElementById("btnPrint");
  btn.addEventListener("click", printTableView);
});

/**
 * Searches the table for user input
 * Highlights matching cells and hides non-matching rows
 */
function SearchTable() {
  let input = document
    .getElementById("search-courses")
    .value.trim()
    .toLowerCase();
  let table = document.getElementById("table");
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    if (row.rowIndex === 0) continue;
    let foundMatch = false;
    for (let j = 0; j < row.cells.length; j++) {
      let cell = row.cells[j];
      cell.style.backgroundColor = "#f8f8f8";
      cell.style.color = "#000000";
      if (input) {
        if (cell.innerText.toLowerCase().indexOf(input) >= 0) {
          cell.style.backgroundColor = "rgba(168,168,168,0.2)";
          cell.style.color = "#cc0033";
          foundMatch = true;
        }
        row.style.display = foundMatch ? "table-row" : "none";
      } else {
        row.style.display = "table-row";
      }
    }
  }
}

/**
 * Reads data from a json file supplied by URL
 * @param url The URL to the json file
 */
function readDataFromJson(url) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let jsonObject;
      try {
        jsonObject = JSON.parse(this.responseText);
      } catch (e) {
        console.log("Couldn't read json file. Error: " + e);
        return;
      }
      buildTable(jsonObject);
    }
  };
  request.open("GET", url, true);
  request.send();
}

/**
 * Builds a table from a supplied jsonObject
 * Formats and displays the table
 * @param jsonObject The jsonObject containing the data
 */
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
    Object.keys(course).forEach(function(k) {
      let cell = row.insertCell();
      cell.appendChild(document.createTextNode(course[k]));

      // Format "true" and "false" to user-friendly text
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
      counter++;
    });
  }
  document.getElementById("container").appendChild(table);
}

/**
 * Adds headers to a supplied table
 * @param table The table
 * @param keys Keys of the table
 */
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

/**
 * Print current page
 */
function printTableView() {
  window.print();
}
