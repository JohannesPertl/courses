const http = require("http");
const fs = require("fs");

//inport functions
const tableView = require("./views/tableView.js");
const saveNewData = require("./functions/addNewCourse.js");
const updateData = require("./functions/changeCourse.js");

//create form view
const inputForm = require("./views/inputForm");

// load additional module formidable, A Node.js module for parsing form data
// more details at https://www.npmjs.com/package/formidable
const formidable = require("formidable");

// entry point for each Request to create matching response
const server = http.createServer((request, response) => {
  // get current url for navigation through web application
  const parts = request.url.split("/");

  if (parts.includes("frontend")) {
    fs.readFile(__dirname + request.url, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
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
  } else if (parts.includes("addCourse")) {
    send(response, inputForm());

    /**
     * save input form
     */
  } else if (parts.includes("save") && request.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(request, (err, course, files) => {
      let result = saveNewData(course);

      if (result) {
        redirect(response, "/");
      } else {
        // TODO -> what is wrong? message to user
      }
    });
    /**
     * print the input form
     */
  } else if (parts.includes("update") && request.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(request, (err, course, files) => {
      let result = updateData(course);

      if (result) {
        redirect(response, "/");
      } else {
        // TODO -> what is wrong? message to user
      }
    });
    /**
     * print the input form
     */
  } else {
    send(response, tableView());
  }
});

// write and send response back to client
function send(response, responseBody) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(responseBody);
}

server.listen(8080, () =>
  console.log("Server and Application is listening to http://localhost:8080")
);

// redirecting to 'to'-location
function redirect(response, to) {
  response.writeHead(302, { location: "/", "content-type": "text/plain" });
  response.end("302 Redirecting to /");
}
