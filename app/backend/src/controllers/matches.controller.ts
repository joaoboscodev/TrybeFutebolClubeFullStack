import { Response, Request } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {

  }

  public async getAllMatches(req: Request, res: Response) {
    const result = await this.matchesService.getAllMatches();
    return res.status(200).json(result);
  }
}

export default MatchesController;
