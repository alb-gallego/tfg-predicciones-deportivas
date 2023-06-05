import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Match } from 'tfg-app/types/match-types';

interface MatchesArgs {
  matches: Array<Match>;
}
export default class Matches extends Component<MatchesArgs> {
  @tracked results: Array<Match> = this.args.matches;
  @tracked teamName: string = '';
  get allTeams() {
    let res: Array<String> = [];
    this.args.matches.forEach((match) => {
      if (!res.includes(match.equipo_local)) {
        res.push(match.equipo_local);
      }
    });
    return res.sort();
  }

  @action
  async getMatchesByTeam(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.teamName = form.value.toString();
    const responsePartidos = await fetch(
      `http://localhost:3000/partidos?equipo=${this.teamName}`
    );
    const partidos = await responsePartidos.json();
    this.results = partidos;
  }
}
