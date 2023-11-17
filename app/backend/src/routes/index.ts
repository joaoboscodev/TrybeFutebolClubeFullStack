import { Router } from 'express';
import matchesRouter from './routesMatches';

const router = Router();
router.use('/matches', matchesRouter);

export default router;
