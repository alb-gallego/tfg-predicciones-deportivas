//Importación de modulos
var express = require("express");
const {
  getAllTeams,
  getMatchesByTeam,
  initMap,
  checkAccuracy,
  checkAccuracyScore,
} = require("./aux.js");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos SQLite
const db = new sqlite3.Database("./db/dbtfg.sqlite");

function selectSQLquery(req) {
  let res = {
    sql: "",
    param: null,
  };
  //Si recibo un parametro equipo
  if (req.query.equipo) {
    res.sql = `SELECT * FROM partidos WHERE equipo_local = ? OR equipo_visitante = ?`;
    res.param = [req.query.equipo, req.query.equipo];
    //Si recibo un parametro fecha
  } else if (req.query.fecha) {
    res.sql = `SELECT * FROM partidos WHERE fecha = ?`;
    res.param = [req.query.fecha];
    //Si no recibo nada dame todos los partidos
  } else {
    res.sql = `SELECT * FROM partidos`;
  }

  return res;
}

const getAllMatches = (req, res) => {
  //Obtención de la petición que se va a hacer al servidor
  query = selectSQLquery(req);
  try {
    //Si no hay parametros obtengo todos los partidos
    if (query.param == null) {
      db.all(query.sql, (error, rows) => {
        if (error) {
          console.error("Error al obtener los partidos", error);
          db.close(); // cerrar la conexión a la base de datos en caso de error
          return res.status(500).send("Error al obtener los partidos");
        }
        //Variable de resultado a devolver
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
            goles_local_real: row.goles_local_real,
            goles_visitante_real: row.goles_visitante_real,
            ganador: row.ganador,
          };
          responseData.push(matchData);
        });
        //Envio de la respuesta
        res.status(200).send(responseData);
      });
    } else {
      //Si obtengo algun parametro filtra por los datos que tengan ese parametro
      db.all(query.sql, query.param, (error, rows) => {
        if (error) {
          console.error("Error al obtener los partidos", error);
          db.close(); // cerrar la conexión a la base de datos en caso de error
          return res.status(500).send("Error al obtener los partidos");
        }
        //Variable de resultado a devolver
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
            goles_local_real: row.goles_local_real,
            goles_visitante_real: row.goles_visitante_real,
            ganador: row.ganador,
          };
          responseData.push(matchData);
        });
        //Envio de la respuesta
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
    //Petición a la base de datos para que
    //obtenga el partido con la id indicada
    let sql = `SELECT *
           FROM partidos
           WHERE id  = ?`;
    //Recibe un id por parametro
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
        goles_local_real: row.goles_local_real,
        goles_visitante_real: row.goles_visitante_real,
        ganador: row.ganador,
      };

      res.setHeader("Content-Type", "application/json");
      //Envio de la respuesta
      res.status(200).send(responseData);
    });
  } catch (err) {
    console.error("Error al obtener el partido", err);
    res.status(500).send("Error al obtener el partido");
  }
};

const getBestPredictionsTeam = async (req, res) => {
  const teamNames = await getAllTeams();
  const resultMap = await initMap();

  try {
    for (const name of teamNames) {
      const matches = await getMatchesByTeam(name);
      for (const teamMatch of matches) {
        if (resultMap.get(name) !== undefined) {
          const matchPrecision = checkAccuracy(
            teamMatch.porcentaje_victoria_local,
            teamMatch.porcentaje_victoria_visitante,
            teamMatch.porcentaje_empate,
            teamMatch.ganador
          );
          resultMap.set(name, resultMap.get(name) + matchPrecision);
        }
      }
    }
    const response = [];
    resultMap.forEach((value, key) => {
      let teamStatistics = {
        teamName: String,
        accuracy: Number,
      };
      teamStatistics.teamName = key;
      teamStatistics.accuracy = value;
      response.push(teamStatistics);
    });
    res.status(200).send(response);
  } catch (err) {
    console.error("Error al obtener el partido", err);
  }
};
const getBestPredictionsLocalTeam = async (req, res) => {
  const teamNames = await getAllTeams();
  const resultMap = await initMap();

  try {
    for (const name of teamNames) {
      const matches = await getMatchesByTeam(name);
      for (const teamMatch of matches) {
        if (
          resultMap.get(name) !== undefined &&
          name === teamMatch.equipo_local
        ) {
          const matchPrecision = checkAccuracy(
            teamMatch.porcentaje_victoria_local,
            teamMatch.porcentaje_victoria_visitante,
            teamMatch.porcentaje_empate,
            teamMatch.ganador
          );
          resultMap.set(name, resultMap.get(name) + matchPrecision);
        }
      }
    }
    const response = [];
    resultMap.forEach((value, key) => {
      let teamStatistics = {
        teamName: String,
        accuracy: Number,
      };
      teamStatistics.teamName = key;
      teamStatistics.accuracy = value;
      response.push(teamStatistics);
    });
    res.status(200).send(response);
  } catch (err) {
    console.error("Error al obtener el partido", err);
  }
};
const getBestPredictionsAwayTeam = async (req, res) => {
  const teamNames = await getAllTeams();
  const resultMap = await initMap();

  try {
    for (const name of teamNames) {
      const matches = await getMatchesByTeam(name);
      for (const teamMatch of matches) {
        if (
          resultMap.get(name) !== undefined &&
          name === teamMatch.equipo_visitante
        ) {
          const matchPrecision = checkAccuracy(
            teamMatch.porcentaje_victoria_local,
            teamMatch.porcentaje_victoria_visitante,
            teamMatch.porcentaje_empate,
            teamMatch.ganador
          );
          resultMap.set(name, resultMap.get(name) + matchPrecision);
        }
      }
    }
    const response = [];
    resultMap.forEach((value, key) => {
      let teamStatistics = {
        teamName: String,
        accuracy: Number,
      };
      teamStatistics.teamName = key;
      teamStatistics.accuracy = value;
      response.push(teamStatistics);
    });
    res.status(200).send(response);
  } catch (err) {
    console.error("Error al obtener el partido", err);
  }
};

const getBestPredictionsScore = async (req, res) => {
  const teamNames = await getAllTeams();
  const resultMap = new Map();
  resultMap.set("score", 0);

  try {
    for (const name of teamNames) {
      const matches = await getMatchesByTeam(name);
      for (const teamMatch of matches) {
        const matchPrecision = checkAccuracyScore(
          teamMatch.goles_local_real,
          teamMatch.goles_local_final,
          teamMatch.goles_visitante_real,
          teamMatch.goles_visitante_final
        );
        resultMap.set("score", resultMap.get("score") + matchPrecision);
      }
    }

    res.status(200).send({ scoreAccuracy: resultMap.get("score") });
  } catch (err) {
    console.error("Error al obtener el partido", err);
  }
};

//Establecer los endpoints
router.get("/", getAllMatches);
router.get("/statistics", getBestPredictionsTeam);
router.get("/statistics/score", getBestPredictionsScore);
router.get("/statistics/local", getBestPredictionsLocalTeam);
router.get("/statistics/away", getBestPredictionsAwayTeam);
router.get("/:id", getMatchById);

process.on("exit", () => {
  // Cierra la conexión a la base de datos cuando ya no la necesites
  db.close();
});

module.exports = router;
