const { log } = require("console");
const fs = require("fs");

// Importa la librería sqlite3
const sqlite3 = require("sqlite3").verbose();

// Ruta al archivo CSV
const csvFilePath = "predicciones-temporada-2020-21.csv";

// Crea una nueva instancia de la base de datos y abre la conexión
let db = new sqlite3.Database("dbtfg.sqlite");

// Lee el contenido del archivo CSV
fs.readFile(csvFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo CSV:", err);
    return;
  }

  // Divide el contenido del archivo en filas
  const rows = data.trim().split("\n");

  // Recorre las filas del CSV (ignorando la primera fila que contiene los encabezados)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(",");

    // Extrae los valores de la fila
    const fecha = row[0];
    const equipoLocal = row[1];
    const equipoVisitante = row[2];
    const probVictoriaLocal = parseInt(row[3]);
    const probEmpate = parseInt(row[4]);
    const probVictoriaVisitante = parseInt(row[5]);
    const golesLocalFinal = parseInt(row[6]);
    const golesVisitanteFinal = parseInt(row[7]);
    const golesLocalDescanso = parseInt(row[8]);
    const golesVisitanteDescanso = parseInt(row[9]);
    const golesLocalReal = parseInt(row[10]);
    const golesVisitanteReal = parseInt(row[11]);
    const ganador = row[12];

    // Ejecuta la consulta SQL para insertar los datos
    db.run(
      `INSERT INTO partidos (fecha, equipo_local, equipo_visitante, goles_local_descanso, goles_local_final, goles_visitante_descanso, goles_visitante_final, porcentaje_empate, porcentaje_victoria_local, porcentaje_victoria_visitante,goles_local_real,goles_visitante_real,ganador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
      [
        fecha,
        equipoLocal,
        equipoVisitante,
        golesLocalDescanso,
        golesLocalFinal,
        golesVisitanteDescanso,
        golesVisitanteFinal,
        probEmpate,
        probVictoriaLocal,
        probVictoriaVisitante,
        golesLocalReal,
        golesVisitanteReal,
        ganador,
      ],
      function (err) {
        if (err) {
          console.error("Error al insertar el registro:", err.message);
          return;
        }
        log(ganador);
        console.log(`Se insertó un nuevo registro con ID ${this.lastID}`);
      }
    );
  }

  // Cierra la conexión a la base de datos cuando ya no la necesites
  db.close();
});
