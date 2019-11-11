// Global variables
var JSON_FILE = "./data/testData.json";


window.addEventListener("load", function () {
    readDataFromJson(JSON_FILE);
});


function readDataFromJson(path) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var jsonObject = JSON.parse(this.responseText);
            console.log(jsonObject);
        }
    };
    request.open("GET", path, true);
    request.send();
}

