function addNewCourseView(courses) {
  //prepare empty form
  let course = {
    Unitcode: "",
    Name: "",
    Typ: "",
    Modul: "",
    SWS: "",
    ECTS: "",
    Semester: "",
    Studium: "",
    Lehrender: "",
    Wahlpflicht: ""
  };

  let inputFormHeader = "Neuer Kurs";

  //Check for duplicates
  let existingUnitcodes = "";
  let existingNames = "";
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    let unitcode = course.Unitcode;
    let name = course.Name;
    if (i === 0) {
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
        <link rel="stylesheet" href="../css/stylesheet.css" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body>
     <header>
        <a href="https://www.fh-joanneum.at/" target="_blank">
          <img class="fh-logo" src="/resources/FhLogo.png" alt="Logo"
        /></a>
        <h1>${inputFormHeader}</h1>
      </header>
    <div class = "container">
    <div class = "row"> 
        <div class = "col-4 col-s-12">
            <form action="/save-new-course" method="POST" class="input-form">
                <p>
                Unitcode:
                    <input type="text" id="unitcode" name="Unitcode" value="${course.Unitcode}" 
                    autofocus required pattern="${regexUnitcode}" title="Unitcode darf noch nicht existieren. Nur Großbuchstaben und Zahlen">
                </p>
                <p>
                Name:
                    <input type="text" id="name" name="Name" value="${course.Name}" 
                    required pattern="${regexName}" title="Name darf noch nicht existieren">
                </p>
                <p>
                Typ:
                    <input list="typ" name="Typ" value="${course.Typ}" 
                    required pattern="[A-Za-z0-9]+" title="Nur Buchstaben und Zahlen">
                        <datalist id="typ"> 
                            <option value="iL" > 
                            <option value="Se" > 
                            <option value="Vo" > 
                            <option value="Praktikum" > 
                        </datalist> 
                </p>
                <p>
                Modul:
                <input type="text" id="modul" name="Modul" value="${course.Modul}" 
                required pattern="(.|\\s)*\\S(.|\\s)*" title="Feld darf nicht leer sein">   
                </p>
                <p>      
                SWS:
                <input type="number" id="sws" min="0" max="100" name="SWS" value="${course.SWS}" required>
                </p>   
                <p>            
                ECTS:
                <input type="number" id="ects" min="0" max="30" name="ECTS" value="${course.ECTS}" required>
                </p> 
                <p>          
                Semester:
                <input type="number" id="semester" min="0" max="20" name="Semester" value="${course.Semester}" required> 
                </p>
                <p>                                  
                Studium:
                <input type="text" id="studium" name="Studium" value="${course.Studium}" 
                required pattern="[A-Z]+" title="Nur Großbuchstaben"> 
                </p>           
                <p>           
                Lehrender:
                <input type="text" id="lehrender" name="Lehrender" value="${course.Lehrender}" 
                required pattern="(.|\\s)*\\S(.|\\s)*" title="Feld darf nicht leer sein">
                </p>
                <p>
                Wahlpflicht:
                <input type="checkbox" id="wahlpflicht" name="Wahlpflicht" value="${course.Wahlpflicht}" >
                </p>
                
                <div class="print">
                <button id="btnCheck">
                <img
                class="image"
                src="resources/check_red.png"
                alt="Speichern"
                />
                <span>SPEICHERN</span>
                </button>
                </div>
                </form>
                
   <div class = "col-8"> </div>
        </div>
              
       </div>
        </div>
    </body>
</html>`;
}

module.exports = addNewCourseView;
