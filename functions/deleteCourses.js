const fs = require("fs");
0;
function deleteCourses(course) {
  let rawdata = fs.readFileSync("./data/courses.json");
  let data = JSON.parse(rawdata);

  console.log(course);

  if (Object.entries(course).length === 0) {
    return false;
  }

  //   if there are more than one id -> the var is an array
  if (Array.isArray(course.id)) {
    course.id.forEach(id => {
      data = removeFromData(data, id);
    });
  } else {
    data = removeFromData(data, course.id);
  }

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
