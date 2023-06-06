CREATE TABLE partidos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	fecha DATE,
	equipo_local TEXT,
	equipo_visitante TEXT,
	goles_local_descanso INTEGER,
	goles_local_final INTEGER,
	goles_visitante_descanso INTEGER,
	goles_visitante_final INTEGER,
	porcentaje_empate INTEGER,
	porcentaje_victoria_local INTEGER,
	porcentaje_victoria_visitante INTEGER NOT_NULL
	goles_local_real INTEGER,
	goles_visitante_real INTEGER,
	ganador TEXT
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY,
  data BLOB
);

