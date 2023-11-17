import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import {
  MatchesI,
  MatchesIModel,
} from '../Interfaces/Matches';

class ModelMatches implements MatchesIModel {
  modelMatches = Matches;

  async getAll(): Promise<MatchesI[]> {
    const result = await this.modelMatches.findAll({
      attributes:
      [
        'id', 'homeTeamId',
        'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress',
      ],
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return result;
  }
}

export default ModelMatches;
