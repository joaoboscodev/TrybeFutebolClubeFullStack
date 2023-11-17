import MatchesModel from '../model/modelMatches';
import { MatchesI } from '../Interfaces/Matches';

class MatchesService {
  constructor(
    private ModelMatches = new MatchesModel(),
  ) {

  }

  public async getAllMatches(): Promise<MatchesI[]> {
    const allMatchesListed = await this.ModelMatches.getAll();

    return allMatchesListed;
  }
}

export default MatchesService;
