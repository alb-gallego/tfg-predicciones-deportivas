import Component from '@glimmer/component';
import { StatisticsObject, StatisticsRanking } from 'tfg-app/types/match-types';

interface StatisticsTableArgs {
  matchesStatistics: StatisticsObject;
}

export default class StatisticsTable extends Component<StatisticsTableArgs> {
  get scoreAccuracy() {
    return Math.round(
      (this.args.matchesStatistics.scoreStatistic.scoreAccuracy / 380) * 100
    );
  }

  get rankingTeams() {
    const rankingAccuracyMatches: Array<StatisticsRanking> = [];
    const sortedData =
      this.args.matchesStatistics.statisticsBestTeamPredicctions.sort(
        (a, b) => b.accuracy - a.accuracy
      );
    let i = 0;
    for (const obj of sortedData) {
      rankingAccuracyMatches.push({
        teamName: obj.teamName,
        accuracy: Math.round((obj.accuracy / 38) * 100),
        ranking: (i += 1),
      });
    }
    return rankingAccuracyMatches;
  }

  get rankingLocalTeamMatches() {
    const rankingAccuracyMatches: Array<StatisticsRanking> = [];
    const sortedData = this.args.matchesStatistics.statisticsLocalTeam.sort(
      (a, b) => b.accuracy - a.accuracy
    );
    let i = 0;
    for (const obj of sortedData) {
      rankingAccuracyMatches.push({
        teamName: obj.teamName,
        accuracy: Math.round((obj.accuracy / 19) * 100),
        ranking: (i += 1),
      });
    }
    return rankingAccuracyMatches;
  }

  get rankingAwayTeamMatches() {
    const rankingAccuracyMatches: Array<StatisticsRanking> = [];
    const sortedData = this.args.matchesStatistics.statisticsAwayTeam.sort(
      (a, b) => b.accuracy - a.accuracy
    );
    let i = 0;
    for (const obj of sortedData) {
      rankingAccuracyMatches.push({
        teamName: obj.teamName,
        accuracy: Math.round((obj.accuracy / 19) * 100),
        ranking: (i += 1),
      });
    }
    return rankingAccuracyMatches;
  }
}
