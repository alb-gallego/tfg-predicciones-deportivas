import Route from '@ember/routing/route';

export default class Index extends Route {
  // normal class body definition here
  async model() {
    const response = await fetch('http://localhost:3000/partidos');
    const partidos = await response.json();
    return partidos;
  }
}
