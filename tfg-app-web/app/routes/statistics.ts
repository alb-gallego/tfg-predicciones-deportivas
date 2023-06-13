import Route from '@ember/routing/route';
import { StatisticsObject, StatisticsType } from 'tfg-app/types/match-types';

export default class Statistics extends Route {
  async model() {
    const result: StatisticsObject = {
      scoreStatistic: { scoreAccuracy: 0 },
      statisticsLocalTeam: [],
      statisticsAwayTeam: [],
      statisticsBestTeamPredicctions: [],
    };

    const responseStatistics = await fetch(
      'http://localhost:3000/partidos/statistics'
    );
    const statistics: Array<StatisticsType> = await responseStatistics.json();
    const responseStatisticsLocal = await fetch(
      'http://localhost:3000/partidos/statistics/local'
    );
    const statisticsLocal: Array<StatisticsType> =
      await responseStatisticsLocal.json();
    const responseStatisticsAway = await fetch(
      'http://localhost:3000/partidos/statistics/away'
    );
    const statisticsAway: Array<StatisticsType> =
      await responseStatisticsAway.json();

    const responseStatisticsScore = await fetch(
      'http://localhost:3000/partidos/statistics/score'
    );
    const statisticsScore: { scoreAccuracy: number } =
      await responseStatisticsScore.json();

    result.scoreStatistic = statisticsScore;
    result.statisticsBestTeamPredicctions = statistics;
    result.statisticsLocalTeam = statisticsLocal;
    result.statisticsAwayTeam = statisticsAway;

    return result;
  }
}
