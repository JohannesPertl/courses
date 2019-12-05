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
        <link rel="stylesheet" href="css/stylesheet.css" />
        <meta charset="utf-8">
    </head>
    <body>
        <h1>${inputFormHeader}</h1>
        <form action="/save" method="POST" class="input-form">
            Unitcode:<br>
            <input type="text" id="unitcode" name="unitcode" value="${course.unitcode}" 
            autofocus required pattern="[A-Za-z0-9]+" title="Nur Buchstaben und Zahlen">
            <br>
            Name:<br>
            <input type="text" id="name" name="name" value="${course.name}" 
            required pattern="[A-Za-z0-9-&]+" title="Nur Buchstaben, Zahlen, & und -">
            <br>
            Typ:<br>
            <input list="typ" name="typ" value="${course.typ}" 
            required pattern="[A-Za-z0-9]+" title="Nur Buchstaben und Zahlen">
            <datalist id="typ"> 
            <option value="iL" /> 
            <option value="Se" /> 
            <option value="Vo" /> 
            <option value="Praktikum" /> 
        </datalist> 
            <br>
            Modul:<br>
            <input type="text" id="modul" name="modul" value="${course.modul}" 
            required pattern="[A-Za-z0-9]+" title="Nur Buchstaben und Zahlen">   
            <br>         
            SWS:<br>
            <input type="number" id="sws" min="0" max="100" name="sws" value="${course.sws}" 
            required>
            <br>            
            ECTS:<br>
            <input type="number" id="ects" min="0" max="30" name="ects" value="${course.ects}" 
            required>
            <br>            
            Semester:<br>
            <input type="number" id="semester" min="0" max="20" name="semester" value="${course.semester}" 
            required> 
            <br>           
            Wahlpflicht:<br>
            <input type="checkbox" id="wahlpflicht" name="wahlpflicht" value="${course.wahlpflicht}" 
            required>
            <br>               
            Studium:<br>
            <input type="text" id="stuidum" name="studium" value="${course.studium}" 
            required pattern="[a-zA-Z]+" title="Nur Buchstaben"> 
            <br>            
            Lehrender:<br>
            <input type="text" id="lehrender" name="lehrender" value="${course.lehrender}" 
            required pattern="[a-zA-Z-]+" title="Nur Buchstaben und -">
            <br>   
            <br>    
            <button type="submit">Speichern</button>     
        </form>
    </body>
</html>`;
}

module.exports = updateCourseView;
