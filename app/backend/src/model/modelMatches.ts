import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import {
  MatchesI,
  MatchesIModel,
  NewMatch,
  TeamMatches,
  TeamStats,
} from '../Interfaces/Matches';

class ModelMatches implements MatchesIModel {
  modelMatches = Matches;
  modelTeams = Teams;

  async getAll(): Promise<MatchesI[]> {
    const result = await this.modelMatches.findAll({
      attributes:
      [
        'id', 'homeTeamId',
        'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress',
      ],
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return result;
  }

  async getAllInProgress(inProgress: boolean): Promise<MatchesI[]> {
    const result = await this.modelMatches.findAll({ where: { inProgress },
      attributes:
      [
        'id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress',
      ],
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return result;
  }

  async finishMatchById(id: string): Promise<void> {
    await this.modelMatches.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(
    id: string,
    scoreUpdatedData: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<void> {
    await this.modelMatches.update(
      {
        homeTeamGoals: scoreUpdatedData.homeTeamGoals,
        awayTeamGoals: scoreUpdatedData.awayTeamGoals,
      },
      {
        where: { id },
      },
    );
  }

  async createMatch(match: NewMatch): Promise<MatchesI> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const result = await this.modelMatches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return result;
  }

  async teamExists(teamId: number): Promise<boolean> {
    const team = await this.modelTeams.findByPk(teamId);
    return !!team;
  }

  static async finishedMatches() {
    return Teams.findAll({
      include: [
        {
          model: Matches,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        }, {
          model: Matches,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as TeamMatches[];
  }

  static totalPointsCalculator(matchesFinished: MatchesI[]) {
    const matchResult = (match: MatchesI) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return 3;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        return 1;
      }
      return 0;
    };
    const totalPoints = matchesFinished.reduce((acc, match) => acc + matchResult(match), 0);
    return totalPoints;
  }

  static totalGamesCalculator(matchesFinished: MatchesI[]) {
    const result = matchesFinished.length;
    return result;
  }

  static totalVictoriesCalculator(matchesFinished: MatchesI[]) {
    return matchesFinished.reduce((totalVictories, match) => {
      const homeTeamWin = match.homeTeamGoals > match.awayTeamGoals;

      return totalVictories + (homeTeamWin ? 1 : 0);
    }, 0);
  }

  static totalDrawsCalculator(matchesFinished: MatchesI[]) {
    const totalDraws = matchesFinished.reduce((acc, match) => {
      const isDraw = match.homeTeamGoals === match.awayTeamGoals;
      return acc + (isDraw ? 1 : 0);
    }, 0);

    return totalDraws;
  }

  static totalLossesCalculator(matchesFinished: MatchesI[]) {
    const matchResult = (match: MatchesI) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return 0;
      } if (match.awayTeamGoals > match.homeTeamGoals) {
        return 1;
      }
      return 0;
    };
    const totalPoints = matchesFinished.reduce((acc, match) => acc + matchResult(match), 0);
    return totalPoints;
  }

  static calculateGoalsFavor(matches: MatchesI[], teamId: number) {
    return matches.reduce((totalGoalsFavor, match) => {
      if (match.homeTeamId === teamId) {
        return totalGoalsFavor + match.homeTeamGoals;
      }
      return totalGoalsFavor;
    }, 0);
  }

  static calculateGoalsOwn(matches: MatchesI[], teamId: number) {
    return matches.reduce((totalGoalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return totalGoalsOwn + match.awayTeamGoals;
      }
      return totalGoalsOwn;
    }, 0);
  }

  static sortByTotalPoints(teams: TeamStats[]) {
    teams.sort((a: TeamStats, b: TeamStats) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.goalsBalance - a.goalsBalance;
    });

    return teams;
  }

  static calculateGoalsBalance(matchesFinished: MatchesI[], teamId: number) {
    const goalsOwn = matchesFinished.reduce((totalGOwn, match) => {
      if (match.homeTeamId === teamId) {
        return totalGOwn + match.awayTeamGoals;
      }
      return totalGOwn;
    }, 0);

    const goalsFavor = matchesFinished.reduce((totalGFavor, match) => {
      if (match.homeTeamId === teamId) {
        return totalGFavor + match.homeTeamGoals;
      }
      return totalGFavor;
    }, 0);

    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  }

  static calculateEfficiency(matchesFinished: MatchesI[]) {
    const totalGames = matchesFinished.length;

    const matchResult = (matche: MatchesI) => {
      if (matche.homeTeamGoals > matche.awayTeamGoals) {
        return 3;
      } if (matche.homeTeamGoals === matche.awayTeamGoals) {
        return 1;
      }
      return 0;
    };
    const totalPoints = matchesFinished.reduce((acc, match) => acc + matchResult(match), 0);

    const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return result;
  }
}

export default ModelMatches;
