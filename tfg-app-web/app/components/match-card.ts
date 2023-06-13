import Component from '@glimmer/component';
import { Match } from 'tfg-app/types/match-types';

interface MatchCardArgs {
  match: Match;
}

export default class MatchCard extends Component<MatchCardArgs> {}
