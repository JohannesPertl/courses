const fs = require("fs");

function addNewCourse(courses, course) {
  if (course.Wahlpflicht == null) course.Wahlpflicht = "false";
  else course.Wahlpflicht = "true";
  courses.push(course);
  let data = JSON.stringify(courses);
  fs.writeFileSync("./data/courses.json", data);
  return true;
}

module.exports = addNewCourse;
