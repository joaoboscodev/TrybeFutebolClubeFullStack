import { Router } from 'express';
import matchesRouter from './routesMatches';
import leaderboardRouter from './routesLeaderboard';

const router = Router();
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
