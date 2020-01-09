/**
 * return the html structure for the standard view of the table (index page)
 */
function printTable() {
  return `<!DOCTYPE html>
  <html lang="de-AT">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="stylesheet" href="css/stylesheet.css" />
      <script src="frontend/script.js" async></script>
      <script src="frontend/confirmDelete.js" async></script>
      <title>FH Joanneum - Courses</title>
      </head>
  
    <body>
      <header>
        <a href="https://www.fh-joanneum.at/" target="_blank">
          <img class="fh-logo" src="/resources/FhLogo.png" alt="Logo"
        /></a>
        <h1>Kurs Übersicht</h1>
      </header>

      <!-- open container -->
      <div class="container">

        <div class="searchtext">
          <h2>Kurs suchen:</h2>
        </div>
    
        <div class="search">
          <label for="search-courses"></label>
          <input
            type="text"
            placeholder="&#8981;"
            id="search-courses"
            onkeyup="SearchTable()"
          />
          
          <div class="print">
          <a id="btnAdd" href="/new-course">
            <img
              class="image"
              src="resources/add_red.png"
              alt="Neuer Kurs"
              title="NEUEN KURS HINZUFÜGEN"
            />
          </a>
          </div>
          
           <div class="print">
           <button id="btnPrint">
            <img
              class="image"
              src="resources/print_red.png"
              alt="Drucken"
              title="DRUCKEN"
            />
          </button>
           </div>
           
           <div class="print">
           <button id="btnExportPDF">
            <img
              class="image"
              src="resources/exportPDF_red.png"
              alt="Als PDF exportieren"
              title="ALS PDF EXPORTIEREN"
            />
          </button>
           </div>
           
           <div class="print">
           <button id="btnExportCSV">
            <img
              class="image"
              src="resources/exportCsv_red.png"
              alt="Als CSV exportieren"
              title="ALS CSV EXPORTIEREN"
            />
          </button>
           </div>
           
        </div>
         
        <div class="row">
          <div class="col-12 col-s-12">
            <div id="container" class="table-container"></div>
          </div>
        </div>
        <!-- close container -->
        </div>
    
    </body>
  </html>`;
}

module.exports = printTable;
