import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import {
  MatchesI,
  MatchesIModel,
  NewMatch,
} from '../Interfaces/Matches';

class ModelMatches implements MatchesIModel {
  modelMatches = Matches;
  modelTeams = Teams;

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

  async getAllInProgress(inProgress: boolean): Promise<MatchesI[]> {
    const result = await this.modelMatches.findAll({ where: { inProgress },
      attributes:
      [
        'id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress',
      ],
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return result;
  }

  async finishMatchById(id: string): Promise<void> {
    await this.modelMatches.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(
    id: string,
    scoreUpdatedData: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<void> {
    await this.modelMatches.update(
      {
        homeTeamGoals: scoreUpdatedData.homeTeamGoals,
        awayTeamGoals: scoreUpdatedData.awayTeamGoals,
      },
      {
        where: { id },
      },
    );
  }

  async createMatch(match: NewMatch): Promise<MatchesI> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const result = await this.modelMatches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return result;
  }

  async teamExists(teamId: number): Promise<boolean> {
    const team = await this.modelTeams.findByPk(teamId);
    return !!team;
  }
}

export default ModelMatches;
