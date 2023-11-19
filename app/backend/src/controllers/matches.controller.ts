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

  async updateScore(req: Request, res: Response) {
    const teamId = req.params.id;
    const scoreUpdatedData = req.body;

    await this.matchesService.updateScore(teamId, scoreUpdatedData);

    return res.status(200).json({ message: 'Score updated' });
  }

  async createMatches(req: Request, res: Response) {
    const newMatch = req.body;
    console.log(newMatch);

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const checkedTeams = await this.matchesService.teamsExists(newMatch);

    if (!checkedTeams) {
      const createdMatch = await this.matchesService.createMatch(newMatch);

      return res.status(201).json(createdMatch);
    }

    return res.status(404).json({ message: 'There is no team with such id!' });
  }
}

export default MatchesController;
