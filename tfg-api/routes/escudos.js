var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos SQLite
const db = new sqlite3.Database("dbtfg.sqlite");

const getImageByName = (req, res) => {
  const imageName = req.query.name;
  console.log(imageName);
  const selectQuery = "SELECT image FROM images WHERE image_name = ?";

  db.get(selectQuery, [imageName], (err, row) => {
    if (err) {
      console.error("Error al obtener la imagen de la base de datos:", err);
      res.sendStatus(500);
      return;
    }

    if (!row) {
      res.sendStatus(404);
      return;
    }

    const imageBuffer = row.data;
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  });
};

router.get("/", getImageByName);
process.on("exit", () => {
  // Cierra la conexión a la base de datos cuando ya no la necesites
  db.close();
});

module.exports = router;
