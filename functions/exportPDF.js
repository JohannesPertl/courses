const fs = require("fs");
let PDFDocument = require('pdfkit');

function exportPDF(courses, response, filename) {
    ws = fs.createWriteStream(filename);
    ws.on('finish', function () {
        console.log("finished");
    });
    // for Getting Started details at http://pdfkit.org/docs/getting_started.html
    let pdf = new PDFDocument({
        size: 'A4', // See other page sizes here: https://github.com/devongovett/pdfkit/blob/d95b826475dd325fb29ef007a9c1bf7a527e9808/lib/page.coffee#L69
        info: {
            Title: 'Course Export',
            Author: 'Team Senil',
        }
    });

    // Write into PDF
    pdf.fontSize(25).text('Course list:');
    pdf.fontSize(12).text('Exported List of Courses');

    // Set the font size
    pdf.fontSize(18);

    pdf.list(["Unitcode, Name, Typ, Modul, SWS, ECTS, Semester, Studium, Lehrender, Wahlpflicht"]);
    // create for each note a new bullet point
    pdf.fontSize(14);
    courses.forEach(function(row) {
        //console.log(row);
        pdf.list([
            row.Unitcode + ", " +
            row.Name + ", " +
            row.Typ + ", " +
            row.Modul + ", " +
            row.SWS + ", " +
            row.ECTS + ", " +
            row.Semester + ", " +
            row.Studium + ", " +
            row.Lehrender + ", " +
            row.Wahlpflicht
        ]);     // https://github.com/foliojs/pdfkit/issues/582
    });

    // Stream contents to PDF file
    pdf
        .on('finish', function () {
            console.log("Write to export.pdf successfully!");
        })
        .pipe(ws);

    // write to http response
    pdf.pipe(response);

    // close pdf document
    pdf.end();
}

module.exports = exportPDF;