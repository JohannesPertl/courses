function updateCourseView(unitCode, courses) {
  //prepare empty form
  let course = {
    unitcode: "",
    name: "",
    typ: "",
    modul: "",
    sws: "",
    ects: "",
    semester: "",
    wahlpflicht: "",
    studium: "",
    lehrender: ""
  };

  let inputFormHeader = "Neuen Kurs erstellen";

  if (unitCode) {
    course = courses.find(crs => crs.unitcode === parseInt(unitCode));
    inputFormHeader = "Kurs ändern";
  }

  //build form with javascript
  return `<!DOCTYPE html>
<html lang="de-AT">
    <head>
        <title>${inputFormHeader}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>${inputFormHeader}</h1>
        <form action="/save" method="POST">
            Unitcode:<br>
            <input type="text" id="unitcode" name="unitcode" value="${course.unitcode}">
            <br>
            Name:<br>
            <input type="text" id="name" name="name" value="${course.name}">
            <br>
            Typ:<br>
            <input type="text" id="typ" name="typ" value="${course.typ}">
            <br>
            Modul:<br>
            <input type="text" id="modul" name="modul" value="${course.modul}">
            <br>         
            SWS:<br>
            <input type="number" id="sws" min="0" max="100" name="sws" value="${course.sws}">
            <br>            
            ECTS:<br>
            <input type="number" id="ects" min="0" max="30" name="ects" value="${course.ects}">
            <br>            
            Semester:<br>
            <input type="number" id="semester" min="0" max="20" name="semester" value="${course.semester}">
            <br>           
            Wahlpflicht:<br>
            <input type="checkbox" id="wahlpflicht" name="wahlpflicht" value="${course.wahlpflicht}">
            <br>               
            Studium:<br>
            <input type="text" id="stuidum" name="studium" value="${course.studium}">
            <br>            
            Lehrender:<br>
            <input type="text" id="lehrender" name="lehrender" value="${course.lehrender}">
            <br>   
            <br>    
            <button type="submit">Speichern</button>     
        </form>
    </body>
</html>`;
}

module.exports = updateCourseView;
