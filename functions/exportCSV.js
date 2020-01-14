const fastcsv = require("fast-csv");
const fs = require("fs");

function exportCSV(courses, response, filename){

console.log("starting csv export");
ws = fs.createWriteStream(filename);
ws.on('finish', function () {
    console.log("finished");
    sendExport(response, filename);
});

// create json for fastcsv module
const jsonData = JSON.parse(JSON.stringify(courses));

// creates csv file
fastcsv
    .write(jsonData, {headers: true})
    .on("finish", function () {
        console.log("Write to export.csv successfully!");
    })
    .pipe(ws);
}

function sendExport(response, filename) {
    fs.readFile(filename, 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
            response.statusCode = 404;
            response.end();
        } else {
            response.writeHead(200, {'Content-disposition': 'attachment; filename=' + filename, 'content-type': 'text/csv'}); // to specify filename for download
            console.log("giving download");
            response.end(data);

        }
    })
}

module.exports = exportCSV;