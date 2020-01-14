const fs = require('fs');
const jsPDF = require('jspdf/dist/jspdf.node.min');

function exportPDF(courses) {
    console.log(courses);

    global.window = {document: {createElementNS: () => {return {}} }};
    global.navigator = {};
    global.btoa = () => {};



// Default export is a4 paper, portrait, using milimeters for units
    var doc = new jsPDF();

    doc.text('Hello world!', 10, 10)

    fs.writeFileSync('./output.pdf', doc.output())
// doc.save('a4.pdf')

    delete global.window;
    delete global.navigator;
    delete global.btoa;


    // var pdf = require("pdf-creator-node");
    // var fs = require('fs');

    // let options = {
    //     format: "A3",
    //     orientation: "portrait",
    //     border: "10mm",
    //     header: {
    //         height: "45mm",
    //         contents: '<div style="text-align: center;">Author: Lukas</div>'
    //     },
    //     "footer": {
    //         "height": "28mm",
    //         "contents": {
    //             first: 'Cover page',
    //             2: 'Second page', // Any page number is working. 1-based index
    //             default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
    //             last: 'Last Page'
    //         }
    //     }
    // };
    // var document = {
    //     html: courses,
    //     data: {
    //        users: users
    //     },
    //     path: "./output.pdf"
    // };
    //
    // pdf.create(courses, options)
    //     .then(res => {
    //         console.log(res)
    //     }).catch(error => {
    //     console.log(error)
    // })

}

module.exports = exportPDF;