const http = require("http");
const fs = require("fs");

//import functions
const courseOverview = require("./views/courseOverview.js");
const addNewCourse = require("./functions/addNewCourse.js");
const changeCourse = require("./functions/changeCourse.js");
const deleteCourses = require("./functions/deleteCourse.js");
const exportCSV = require("./functions/exportCSV.js");
const exportPDF = require("./functions/exportPDF.js");
//create form view
const updateCourseView = require("./views/addNewCourseView");
const editCourseView = require("./views/editCourseView");

// load additional module formidable, A Node.js module for parsing form data
// more details at https://www.npmjs.com/package/formidable
const formidable = require("formidable");

// entry point for each Request to create matching response
const server = http.createServer((request, response) => {
  // get current url for navigation through web application
  const parts = request.url.split("/");

  //import data
  let courses = require("./data/courses.json");
  if (parts.includes("frontend")) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.setHeader("content-type", "application/x-javascript");
        response.statusCode = 404;
        response.end();
      } else {
        response.setHeader("content-type", "application/x-javascript");
        response.writeHead(200);
        response.end(data);
      }
    });

    /**
     * return resources from data path
     */
  } else if (parts.includes("data")) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.setHeader("content-type", "application/json");
        response.writeHead(200);
        response.end(data);
      }
    });
    /**
     * return resources from css path
     */
  } else if (parts.includes("css")) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.setHeader("content-type", "text/css");
        response.end(data);
      }
    });
    /**
     * return resources from resources path
     */
  } else if (parts.includes("resources")) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.end(data);
      }
    });

    /**
     * print the input form
     */
  } else if (parts.includes("new-course")) {
    send(response, updateCourseView(courses));

    /**
     * save input form
     */
  } else if (parts.includes("save-new-course") && request.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(request, (err, course, files) => {
      courses = addNewCourse(courses, course);

      if (!courses) {
        console.log("ERROR: Couldn't save new course.");
      }
      redirect(response, "/");
    });
    /**
     * delete selected courses
     */
  } else if (parts.includes("delete-courses")) {
    if (parts.length === 3) {
      let unitCode = parts[2];
      let result = deleteCourses(courses, unitCode);
      if (!result) {
        console.log(`ERROR: Couldn't delete course with Unit Code ${unitCode}.`);
      }
      redirect(response, "/");
    }
    /**
     * print the edit form
     */
  } else if (parts.includes("changeCourse")) {
    if (parts.length === 3) {
      let unitCode = parts[2];
      send(response, editCourseView(courses, unitCode));
    }

    /**
     * print the edit form
     */
  } else if (parts.includes("save-edit-course") && request.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(request, (err, course, files) => {
      if (parts.length === 3) {
        let unitCode = parts[2];
        courses = changeCourse(courses, course, unitCode);
        if (!courses) {
          console.log(`ERROR: Couldn't save changes for course with Unit Code ${unitCode}.`);
        }
        redirect(response, "/");
      }
    });
    /**
     * export functions
     */
  } else if (parts.includes("export")) {
    console.log("export");
    if (parts.includes("csv")) {
      exportCSV(courses, response, "export.csv");
    } else if (parts.includes("export.pdf")) {
      console.log("pdf");
      exportPDF(courses, response, "export.pdf");
    }
    /**
     * print the overview
     */
  } else {
    send(response, courseOverview());
  }
});

// write and send response back to client
function send(response, responseBody) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(responseBody);
}

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8080;
}
server.listen(port, () =>
  console.log("Server and Application is listening to http://localhost:8080")
);

// redirecting to 'to'-location
function redirect(response, to) {
  response.writeHead(302, { location: "/", "content-type": "text/plain" });
  response.end("302 Redirecting to /");
}
