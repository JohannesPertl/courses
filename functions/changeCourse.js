const fs = require('fs');

function changeCourse(courses, course, code) {
    console.log(course);
    if (course.Wahlpflicht == null)
        course.Wahlpflicht = "false";
    else
        course.Wahlpflicht = "true";
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].Unitcode === code) {
            console.log(courses[i].Unitcode);
            courses[i] = course;
        }
    }
    console.log("save: " + course.Name);
    let data = JSON.stringify(courses);
    fs.writeFileSync("./data/courses.json", data);
    // return true if everything is right
    return true;
}


module.exports = changeCourse;
