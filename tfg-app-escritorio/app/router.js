import EmberRouter from '@ember/routing/router';
import config from 'tfg-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('match-details', { path: 'match-details/:match_id' });
  this.route('index', { path: '/' });
  this.route('statistics');
});
