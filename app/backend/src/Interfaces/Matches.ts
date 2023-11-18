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

export { MatchesI, MatchesIModel, NewMatch };
