// Importa la librería sqlite3
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos y abre la conexión
let db = new sqlite3.Database("dbtfg.sqlite");

// Define los datos a insertar
const fecha = "1995-09-02";
const equipo_local = "Vallecano";
const equipo_visitante = "Real Madrid";
const goles_local_descanso = 0;
const goles_local_final = 0;
const goles_visitante_descanso = 1;
const goles_visitante_final = 2;
const porcentaje_empate = 20.0;
const porcentaje_victoria_local = 30.0;
const porcentaje_victoria_visitante = 50.0;
db.run(
  `CREATE TABLE images (
  id INTEGER PRIMARY KEY,
  data BLOB);`,
  function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Se insertó un nuevo registro con ID ${this.lastID}`);
  }
);

// Ejecuta la consulta SQL para insertar los datos
db.run(
  `INSERT INTO partidos (fecha, equipo_local,equipo_visitante,goles_local_descanso,goles_local_final,goles_visitante_descanso,goles_visitante_final,porcentaje_empate,porcentaje_victoria_local,porcentaje_victoria_visitante) VALUES (?,?,?,?,?,?,?, ?,?, ?)`,
  [
    fecha,
    equipo_local,
    equipo_visitante,
    goles_local_descanso,
    goles_local_final,
    goles_visitante_descanso,
    goles_visitante_final,
    porcentaje_empate,
    porcentaje_victoria_local,
    porcentaje_victoria_visitante,
  ],
  function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Se insertó un nuevo registro con ID ${this.lastID}`);
  }
);

// Cierra la conexión a la base de datos cuando ya no la necesites
db.close();
