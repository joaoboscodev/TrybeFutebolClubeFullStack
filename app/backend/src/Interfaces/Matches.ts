interface MatchesIModel {
  getAll(): Promise<MatchesI[]>
}
interface MatchesI {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
  inProgress: boolean,
}

export { MatchesI, MatchesIModel };
