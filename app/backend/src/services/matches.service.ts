import MatchesModel from '../model/modelMatches';
import { MatchesI, NewMatch } from '../Interfaces/Matches';

class MatchesService {
  constructor(
    private ModelMatches = new MatchesModel(),
  ) {

  }

  async getAllMatches(): Promise<MatchesI[]> {
    const allMatchesListed = await this.ModelMatches.getAll();
    return allMatchesListed;
  }

  async getAllMatchesInProgress(inProgress: boolean): Promise<MatchesI[]> {
    const allMatchesInProgress = await this.ModelMatches.getAllInProgress(inProgress);
    return allMatchesInProgress;
  }

  async finishMatchById(matchId: string): Promise<void> {
    await this.ModelMatches.finishMatchById(matchId);
  }

  async updateScore(
    matchId: string,
    scoreUpdatedData: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<void> {
    await this.ModelMatches.updateScore(matchId, scoreUpdatedData);
  }

  async createMatch(match: NewMatch): Promise<MatchesI> {
    const newMatch = await this.ModelMatches.createMatch(match);
    return newMatch;
  }

  async teamsExists(match: NewMatch) {
    const homeTeamExists = await this.ModelMatches.teamExists(match.homeTeamId);
    if (!homeTeamExists) {
      return { message: 'There is no team with such id!' };
    }
    const awayTeamExists = await this.ModelMatches.teamExists(match.awayTeamId);
    if (!awayTeamExists) {
      return { message: 'There is no team with such id!' };
    }
  }
}

export default MatchesService;
