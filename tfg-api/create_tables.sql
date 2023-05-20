CREATE TABLE partidos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	fecha DATE,
	equipo_local TEXT,
	equipo_visitante TEXT,
	goles_local_descanso INTEGER,
	goles_local_final INTEGER,
	goles_visitante_descanso INTEGER,
	goles_visitante_final INTEGER,
	porcentaje_empate REAL,
	porcentaje_victoria_local REAL,
	porcentaje_victoria_visitante REAL NOT_NULL
);
