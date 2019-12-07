const fs = require('fs');
function changeCourse(courses, course) {
  console.log("course");
  course.Wahlpflicht.replace("", "");
  //TODO: delete course


  courses.push(course);
  console.log("save: " + course.Name);
  let data = JSON.stringify(courses);
  fs.writeFileSync("./data/courses.json", data);
  // return true if everything is right
  return true;
}


module.exports = changeCourse;
