function updateCourseView(courses) {

    //prepare empty form
    let course = {
        Unitcode: "",
        Name: "",
        Typ: "",
        Modul: "",
        SWS: "",
        ECTS: "",
        Semester: "",
        Wahlpflicht: "",
        Studium: "",
        Lehrender: ""
    };

    let inputFormHeader = "Neuen Kurs erstellen";

    // if (unitCode) {
    //     course = courses.find(crs => crs.Unitcode === parseInt(unitCode));
    //     inputFormHeader = "Kurs ändern";
    // }

    //Check for duplicates
    let existingUnitcodes = "";
    let existingNames = "";
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let unitcode = course.Unitcode;
        let name = course.Name;
        if (i === 0){
            existingUnitcodes += "\\b" + unitcode;
            existingNames += "\\b" + name;
            continue;
        }
        existingUnitcodes += "\\b|" + unitcode + "\\b";
        existingNames += "\\b|" + name + "\\b";

    }

    let regexUnitcode = "\\b(?!" + existingUnitcodes + ")[A-Z0-9]+";
    let regexName = "\\b(?!" + existingNames + ").*";


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
        <form action="/save-new-course" method="POST" class="input-form">
            Unitcode:<br>
            <input type="text" id="unitcode" name="Unitcode" value="${course.Unitcode}" 
            autofocus required pattern="${regexUnitcode}" title="Unitcode darf noch nicht existieren. Nur Großbuchstaben und Zahlen">
            <br>
            Name:<br>
            <input type="text" id="name" name="Name" value="${course.Name}" 
            required pattern="${regexName}" title="Name darf noch nicht existieren">
            <br>
            Typ:<br>
            <input list="typ" name="Typ" value="${course.Typ}" 
            required pattern="[A-Za-z0-9]+" title="Nur Buchstaben und Zahlen">
            <datalist id="typ"> 
            <option value="iL" /> 
            <option value="Se" /> 
            <option value="Vo" /> 
            <option value="Praktikum" /> 
        </datalist> 
            <br>
            Modul:<br>
            <input type="text" id="modul" name="Modul" value="${course.Modul}" 
            required pattern="(.|\\s)*\\S(.|\\s)*" title="Feld darf nicht leer sein">   
            <br>         
            SWS:<br>
            <input type="number" id="sws" min="0" max="100" name="SWS" value="${course.SWS}" 
            required>
            <br>            
            ECTS:<br>
            <input type="number" id="ects" min="0" max="30" name="ECTS" value="${course.ECTS}" 
            required>
            <br>            
            Semester:<br>
            <input type="number" id="semester" min="0" max="20" name="Semester" value="${course.Semester}" 
            required> 
            <br>           
            Wahlpflicht:<br>
            <input type="checkbox" id="wahlpflicht" name="Wahlpflicht" value="${course.Wahlpflicht}" >
            <br>               
            Studium:<br>
            <input type="text" id="studium" name="Studium" value="${course.Studium}" 
            required pattern="[A-Z]+" title="Nur Großbuchstaben"> 
            <br>            
            Lehrender:<br>
            <input type="text" id="lehrender" name="Lehrender" value="${course.Lehrender}" 
            required pattern="(.|\\s)*\\S(.|\\s)*" title="Feld darf nicht leer sein">
            <br>   
            <br>    
            <button type="submit">Speichern</button>     
        </form>
    </body>
</html>`;
}



module.exports = updateCourseView;
