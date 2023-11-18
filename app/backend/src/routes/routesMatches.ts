import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/tokenValidation';

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

router.patch('/:id/finish', tokenValidation.isTokenValid, (req: Request, res: Response) => {
  matchesController.finishMatch(req, res);
});

router.patch('/:id', tokenValidation.isTokenValid, (req: Request, res: Response) => {
  matchesController.updateScore(req, res);
});

export default router;
