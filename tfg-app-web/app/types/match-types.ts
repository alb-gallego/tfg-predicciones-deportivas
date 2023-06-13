export type Match = {
  id: string;
  fecha: string;
  equipo_local: string;
  equipo_visitante: string;
  goles_local_lescanso: number;
  goles_visitante_descanso: number;
  goles_local_final: number;
  goles_visitante_final: number;
  porcentaje_victoria_local: number;
  porcentaje_victoria_visitante: number;
  porcentaje_empate: number;
  goles_local_real: number;
  goles_local_visitante: number;
  ganador: 'H' | 'A' | 'D';
};

export type StatisticsObject = {
  scoreStatistic: { scoreAccuracy: number };
  statisticsLocalTeam: Array<StatisticsType>;
  statisticsAwayTeam: Array<StatisticsType>;
  statisticsBestTeamPredicctions: Array<StatisticsType>;
};

export type Probability = {
  probLocal: number;
  probVisitante: number;
  probEmpate: number;
};

export type StatisticsType = {
  teamName: string;
  accuracy: number;
};

export type StatisticsRanking = StatisticsType & {
  ranking: number;
};
