import MatchesModel from '../model/modelMatches';
import { MatchesI } from '../Interfaces/Matches';

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
}

export default MatchesService;
