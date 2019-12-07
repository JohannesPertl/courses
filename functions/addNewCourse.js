const fs = require('fs');

function addNewCourse(courses, course) {
    console.log(course);
    if (course.Wahlpflicht == null)
        course.Wahlpflicht = "false";
    else
        course.Wahlpflicht = "true";
    courses.push(course);
    console.log("save: " + course.Name);
    let data = JSON.stringify(courses);
    fs.writeFileSync("./data/courses.json", data);
    // return true if everything is right
    return true;
}

module.exports = addNewCourse;
