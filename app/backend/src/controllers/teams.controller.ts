import { Request, Response } from 'express';
import TeamsService from '../services/teams.services';

class TeamsController {
  static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();
    res.status(200).json(allTeams);
  }

  static async getById(req: Request, res: Response) {
    const teamId = req.params.id;
    const allTeams = await TeamsService.getByID(parseInt(teamId, 10));
    res.status(200).json(allTeams);
  }
}

export default TeamsController;
