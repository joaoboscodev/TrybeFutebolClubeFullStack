import { Router, Request, Response } from 'express';
import ModelMatches from '../model/modelMatches';

const router = Router();

router.get('/home', async (_req: Request, res: Response) => {
  const finishedMatches = await ModelMatches.finishedMatches();
  // console.log(finishedMatches);

  const result = finishedMatches.map(async (team) => ({
    name: team.teamName,
    totalPoints: ModelMatches.totalPointsCalculator(team.homeTeam),
    totalGames: ModelMatches.totalGamesCalculator(team.homeTeam),
    totalVictories: ModelMatches.totalVictoriesCalculator(team.homeTeam),
    totalDraws: ModelMatches.totalDrawsCalculator(team.homeTeam),
    totalLosses: ModelMatches.totalLossesCalculator(team.homeTeam),
    goalsFavor: ModelMatches.calculateGoalsFavor(team.homeTeam, team.id),
    goalsOwn: ModelMatches.calculateGoalsOwn(team.homeTeam, team.id),
  }));

  const resultFinal = await Promise.all(result);
  // console.log(resultFinal);
  return res.status(200).json(resultFinal);
});

export default router;
