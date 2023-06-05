import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Match } from 'tfg-app/types/match-types';

interface MatchCardArgs {
  match: Match;
}

export default class MatchCard extends Component<MatchCardArgs> {
  @tracked imgLocal: string = '';
  @tracked imgVisitante: string = '';

  @action
  changeImg() {
    console.log(this.args.match);
    this.imgLocal = this.args.match.equipo_local;
    return;
  }

  // async getEscudo() {
  //   const responseEscudos = await fetch(
  //     'http://localhost:3000/escudos?name=Valladolid'
  //   );
  //   console.log(responseEscudos);

  //   const escudos = await responseEscudos.blob();
  //   const escudoRender = URL.createObjectURL(escudos);
  //   console.log(escudoRender);

  //   return escudoRender;
  // }
}
