var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos SQLite
const db = new sqlite3.Database("dbtfg.sqlite");

function selectSQLquery(req) {
  let res = {
    sql: "",
    param: null,
  };

  if (req.query.equipo) {
    res.sql = `SELECT * FROM partidos WHERE equipo_local = ? OR equipo_visitante = ?`;
    res.param = [req.query.equipo, req.query.equipo];
  } else if (req.query.fecha) {
    res.sql = `SELECT * FROM partidos WHERE fecha = ?`;
    res.param = [req.query.fecha];
  } else {
    res.sql = `SELECT * FROM partidos`;
  }

  return res;
}

const getAllMatches = (req, res) => {
  query = selectSQLquery(req);
  console.log(query);
  try {
    if (query.param == null) {
      db.all(query.sql, (error, rows) => {
        if (error) {
          console.error("Error al obtener los partidos", error);
          db.close(); // cerrar la conexión a la base de datos en caso de error
          return res.status(500).send("Error al obtener los partidos");
        }
        let responseData = [];
        // Maneja los resultados de la consulta
        rows.forEach((row) => {
          const matchData = {
            id: row.id,
            fecha: row.fecha,
            equipo_local: row.equipo_local,
            equipo_visitante: row.equipo_visitante,
            goles_local_descanso: row.goles_local_descanso,
            goles_local_final: row.goles_local_final,
            goles_visitante_descanso: row.goles_visitante_descanso,
            goles_visitante_final: row.goles_visitante_final,
            porcentaje_empate: row.porcentaje_empate,
            porcentaje_victoria_local: row.porcentaje_victoria_local,
            porcentaje_victoria_visitante: row.porcentaje_victoria_visitante,
          };
          responseData.push(matchData);
        });
        res.status(200).send(responseData);
      });
    } else {
      db.all(query.sql, query.param, (error, rows) => {
        if (error) {
          console.error("Error al obtener los partidos", error);
          db.close(); // cerrar la conexión a la base de datos en caso de error
          return res.status(500).send("Error al obtener los partidos");
        }
        let responseData = [];
        // Maneja los resultados de la consulta
        rows.forEach((row) => {
          const matchData = {
            id: row.id,
            fecha: row.fecha,
            equipo_local: row.equipo_local,
            equipo_visitante: row.equipo_visitante,
            goles_local_descanso: row.goles_local_descanso,
            goles_local_final: row.goles_local_final,
            goles_visitante_descanso: row.goles_visitante_descanso,
            goles_visitante_final: row.goles_visitante_final,
            porcentaje_empate: row.porcentaje_empate,
            porcentaje_victoria_local: row.porcentaje_victoria_local,
            porcentaje_victoria_visitante: row.porcentaje_victoria_visitante,
          };
          responseData.push(matchData);
        });
        res.status(200).send(responseData);
      });
    }
  } catch (err) {
    console.error("Error al obtener los partidos", err);
    res.status(500).send("Error al obtener los partidos");
  }
};

const getMatchById = (req, res) => {
  try {
    let sql = `SELECT *
           FROM partidos
           WHERE id  = ?`;
    let partidoId = req.params.id;

    db.get(sql, [partidoId], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      if (!row) {
        return res.status(404).send("No se encontró ningún partido con ese ID");
      }
      const responseData = {
        id: row.id,
        fecha: row.fecha,
        equipo_local: row.equipo_local,
        equipo_visitante: row.equipo_visitante,
        goles_local_descanso: row.goles_local_descanso,
        goles_local_final: row.goles_local_final,
        goles_visitante_descanso: row.goles_visitante_descanso,
        goles_visitante_final: row.goles_visitante_final,
        porcentaje_empate: row.porcentaje_empate,
        porcentaje_victoria_local: row.porcentaje_victoria_local,
        porcentaje_victoria_visitante: row.porcentaje_victoria_visitante,
      };

      res.setHeader("Content-Type", "application/json");
      res.status(200).send(responseData);
    });
  } catch (err) {
    console.error("Error al obtener el partido", err);
    res.status(500).send("Error al obtener el partido");
  }
};

router.get("/", getAllMatches);
router.get("/:id", getMatchById);

process.on("exit", () => {
  // Cierra la conexión a la base de datos cuando ya no la necesites
  db.close();
});

module.exports = router;
