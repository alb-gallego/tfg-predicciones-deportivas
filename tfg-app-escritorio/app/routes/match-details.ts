import Route from '@ember/routing/route';

export default class MatchDetailsRoute extends Route {
  async model(params: { match_id: string }) {
    const response = await fetch(
      `http://localhost:3000/partidos/${params.match_id}`
    );
    const partido = await response.json();
    return partido;
  }
}
