const fs = require('fs');

function changeCourse(courses, course, code) {

    if (course.Wahlpflicht == null)
        course.Wahlpflicht = "false";
    else
        course.Wahlpflicht = "true";

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].Unitcode === code) {
            courses[i] = course;
        }
    }
    let data = JSON.stringify(courses);
    fs.writeFileSync("./data/courses.json", data);
    return true;
}


module.exports = changeCourse;
