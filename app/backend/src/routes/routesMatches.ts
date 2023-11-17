import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();
router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === 'true' || inProgress === 'false') {
    matchesController.getAllMatchesInProgress(req, res);
  } else if (inProgress === undefined) {
    matchesController.getAllMatches(req, res);
  }
});

export default router;
