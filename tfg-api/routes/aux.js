//Importación de modulos
var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Crea una nueva instancia de la base de datos SQLite
const db = new sqlite3.Database("./db/dbtfg.sqlite");

function getAllTeams() {
  return new Promise((resolve, reject) => {
    const teamNames = [];
    // Petición a la base de datos para obtener los nombres de los equipos
    let sql = `SELECT DISTINCT equipo_local AS equipo FROM partidos
      UNION
      SELECT DISTINCT equipo_visitante AS equipo FROM partidos;`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          teamNames.push(row.equipo);
        });
        resolve(teamNames);
      }
    });
  });
}

function getMatchesByTeam(teamName) {
  return new Promise((resolve, reject) => {
    const responseData = [];
    const sql = `SELECT * FROM partidos WHERE equipo_local = ? OR equipo_visitante = ?`;
    db.all(sql, [teamName, teamName], (error, rows) => {
      if (error) {
        console.error("Error al obtener los partidos", error);
        db.close();
        reject(error);
        return;
      }
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
      resolve(responseData);
    });
  });
}

function checkAccuracy(probLocal, probVisit, probEmpate, finalWinner) {
  let prediccion = "";
  if (probVisit >= probLocal && probVisit >= probEmpate) {
    prediccion = "A";
  }
  if (probEmpate >= probVisit && probEmpate >= probLocal) {
    prediccion = "D";
  }
  if (probLocal >= probVisit && probLocal >= probVisit) {
    prediccion = "H";
  }
  if (prediccion === finalWinner) {
    return 1;
  } else {
    return 0;
  }
}

function checkAccuracyScore(
  golesLocalReal,
  golesLocalFinal,
  golesVisitanteReal,
  golesVisitanteFinal
) {
  if (
    golesLocalReal === golesLocalFinal &&
    golesVisitanteFinal === golesVisitanteReal
  ) {
    return 1;
  }
  return 0;
}

async function initMap() {
  const res = new Map();
  const teams = await getAllTeams();
  if (teams) {
    for (const name of teams) {
      res.set(name, 0);
    }
  }
  return res;
}

module.exports = {
  checkAccuracy,
  getAllTeams,
  getMatchesByTeam,
  initMap,
  checkAccuracyScore,
};
