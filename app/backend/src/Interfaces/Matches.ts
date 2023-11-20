interface MatchesIModel {
  getAll(): Promise<MatchesI[]>
  createMatch(data: NewMatch): Promise<MatchesI>,
}
interface MatchesI {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
  inProgress: boolean,
}

interface NewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface TeamMatches {
  id: number;
  teamName: string;
  homeTeam: MatchesI[];
  awayTeam: MatchesI[];
}

interface TeamStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export { MatchesI, MatchesIModel, NewMatch, TeamMatches, TeamStats };
