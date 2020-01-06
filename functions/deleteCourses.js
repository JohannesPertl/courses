const fs = require("fs");
function deleteCourses(course) {
  let rawdata = fs.readFileSync("./data/courses.json");
  let data = JSON.parse(rawdata);

  if (course.length < 1) {
    return false;
  }
  data = removeFromData(data, course);

  //   write the new array to the file
  data = JSON.stringify(data);
  fs.writeFileSync("./data/courses.json", data);

  return true;
}

function removeFromData(data, id) {
  for (i = 0; i < data.length; i++) {
    if (data[i].Unitcode == id) {
      var newData = data.splice(1);
      break;
    }
  }
  return newData;
}

module.exports = deleteCourses;
