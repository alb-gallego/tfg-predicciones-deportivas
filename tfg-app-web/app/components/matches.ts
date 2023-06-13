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
  @tracked date: string = '';
  get allTeams() {
    let res: Array<String> = [];
    this.args.matches.forEach((match) => {
      if (!res.includes(match.equipo_local)) {
        res.push(match.equipo_local);
      }
    });
    return res.sort();
  }

  get allDates() {
    let res: Array<String> = [];
    this.args.matches.forEach((match) => {
      if (!res.includes(match.fecha)) {
        res.push(match.fecha);
      }
    });
    return res.sort();
  }
  @action
  async getMatchesByDate(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.date = form.value.toString();
    if (this.date === '') {
      const responsePartidos = await fetch(`http://localhost:3000/partidos`);
      const partidos: Array<Match> = await responsePartidos.json();
      // this.results = this.#obtenerElementosComunes(this.results, partidos);
      this.results = partidos;
    } else {
      const responsePartidos = await fetch(
        `http://localhost:3000/partidos?fecha=${this.date}`
      );
      const partidos: Array<Match> = await responsePartidos.json();
      // this.results = this.#obtenerElementosComunes(this.results, partidos);
      this.results = partidos;
    }
  }

  @action
  async getMatchesByTeam(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    this.teamName = form.value.toString();
    if (this.teamName === '') {
      const responsePartidos = await fetch(`http://localhost:3000/partidos`);
      const partidos: Array<Match> = await responsePartidos.json();
      // this.results = this.#obtenerElementosComunes(this.results, partidos);
      this.results = partidos;
    } else {
      const responsePartidos = await fetch(
        `http://localhost:3000/partidos?equipo=${this.teamName}`
      );
      const partidos: Array<Match> = await responsePartidos.json();
      // this.results = this.#obtenerElementosComunes(this.results, partidos);
      this.results = partidos;
    }
  }

  #obtenerElementosComunes(array1: Array<Match>, array2: Array<Match>) {
    // Filtrar los elementos del primer array que están presentes en el segundo array
    var elementosComunes = array1.filter(function (elemento1) {
      return array2.some(function (elemento2) {
        return elemento2.id === elemento1.id;
      });
    });
    console.log(elementosComunes);

    // Devolver el array con los elementos comunes
    return elementosComunes;
  }
}
