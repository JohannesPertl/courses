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
        </div>
       
        <div class="row">
          <div class="col-12 col-s-12">
            <div id="container" class="table-container"></div>
          </div>
        </div>
        <!-- close container -->
        </div>
      
         
        
        

      <footer>
      <div class="print">
          <a href="/new-course"><button id="btnAdd">
            <img
              class="image"
              src="resources/iconAdd.png"
              alt="Hinzufügen"
            /><span>NEUER KURS</span>
          </button>
          </a>
        </div>
        <div class="print">
          <button id="btnPrint">
            <img
              class="image"
              src="resources/icon_printer_blk.png"
              alt="Drucken"
            /><span>DRUCKEN</span>
          </button>
        </div>
      </footer>
    </body>
  </html>`;
}

module.exports = printTable;
