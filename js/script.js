// Global variables
var JSON_FILE =
  "https://raw.githubusercontent.com/MobileSoftwareDevelopment/courses/dev/data/testData.json";

window.addEventListener("load", function() {
  readDataFromJson(JSON_FILE);
  var btn = document.getElementById("btnPrint");
  btn.addEventListener("click", printTableView);
});

function readDataFromJson(path) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var jsonObject = JSON.parse(this.responseText);
      buildTable(jsonObject);
    }
  };
  request.open("GET", path, true);
  request.send();
}

function addHeaders(table, keys) {
  var header = table.createTHead();
  var row = header.insertRow();
  for (var i = 0; i < keys.length; i++) {
    var cell = row.appendChild(document.createElement("th"));
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
  var table = document.createElement("table");
  var tbody = table.appendChild(document.createElement("tbody"));

  for (var i = 0; i < jsonObject.length; i++) {
    var course = jsonObject[i];
    if (i === 0) {
      addHeaders(table, Object.keys(course));
    }
    var row = tbody.insertRow();
    let counter = 0;
    Object.keys(course).forEach(function(k) {
      console.log(k);
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(course[k]));
      // Format Wahlpflichtfach
      switch (cell.innerText.toLocaleLowerCase()) {
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

function printTableView() {
  window.print();
}
