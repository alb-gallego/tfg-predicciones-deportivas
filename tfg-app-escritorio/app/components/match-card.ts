import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Match {
  equipo_local: string;
  equipo_visitante: string;
  fecha: string;
  goles_local_descanso: number;
  goles_local_final: number;
  goles_visitante_descanso: number;
  goles_visitante_final: number;
  id: number;
  porcentaje_empate: number;
  porcentaje_victoria_local: number;
  porcentaje_victoria_visitante: number;
}
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
}
