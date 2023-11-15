import Teams from '../database/models/Teams.model';

class TeamsService {
  static async getAll() {
    const getTeams = await Teams.findAll();
    return getTeams;
  }

  static async getByID(teamId: number) {
    const getTeamsByID = await Teams.findByPk(teamId);
    return getTeamsByID;
  }
}

export default TeamsService;
