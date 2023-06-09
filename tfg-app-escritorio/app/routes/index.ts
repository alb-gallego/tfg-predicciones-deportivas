import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Index extends Route {
  @service store: any;

  async model() {
    const responsePartidos = await fetch('http://localhost:3000/partidos');
    const partidos = await responsePartidos.json();
    return partidos;
  }
}
