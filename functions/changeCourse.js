const fs = require('fs');

function changeCourse(courses, course) {
    console.log(course);
    course.Wahlpflicht.replace("", "");
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].Unitcode == course.Unitcode) {
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
