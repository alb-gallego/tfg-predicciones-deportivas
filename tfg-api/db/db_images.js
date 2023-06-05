// Importa la librería sqlite3
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos y abre la conexión
let db = new sqlite3.Database("dbtfg.sqlite");

const fs = require("fs");

const folderPath = "./escudos";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error al leer la carpeta:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = folderPath + "/" + file;
    const imageBuffer = fs.readFileSync(filePath);
    db.run(
      `INSERT INTO images (image,image_name) VALUES (?,?  )`,
      [imageBuffer, file.split(".")[0]],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Se insertó un nuevo registro con ID ${this.lastID}`);
      }
    );
    // Cierra la conexión a la base de datos cuando ya no la necesites
  });
  db.close();
});
