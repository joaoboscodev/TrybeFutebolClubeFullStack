import { Response, Request } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {

  }

  async getAllMatches(req: Request, res: Response) {
    const result = await this.matchesService.getAllMatches();

    return res.status(200).json(result);
  }

  async getAllMatchesInProgress(req: Request, res: Response) {
    const inProgress = req.query.inProgress === 'true';

    const result = await this.matchesService.getAllMatchesInProgress(inProgress);

    return res.status(200).json(result);
  }

  async finishMatch(req: Request, res: Response) {
    const teamId = req.params.id;

    await this.matchesService.finishMatchById(teamId);

    return res.status(200).json({ message: 'Finished' });
  }
}

export default MatchesController;
