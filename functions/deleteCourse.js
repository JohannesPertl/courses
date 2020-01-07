const fs = require("fs");
function deleteCourse(courses, unitCode) {

  if (unitCode.length < 1) {
    return false;
  }

  // Remove course
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].Unitcode === unitCode) {
      courses.splice(i, 1);
    }
  }


  // Write the new array to the file
  let data = JSON.stringify(courses);
  fs.writeFileSync("./data/courses.json", data);

  return true;
}


module.exports = deleteCourse;
