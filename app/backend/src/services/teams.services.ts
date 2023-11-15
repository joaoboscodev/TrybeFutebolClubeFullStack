import Teams from '../database/models/Teams.model';

class TeamsService {
  static async getAll() {
    const getTeams = await Teams.findAll();
    return getTeams;
  }
}

export default TeamsService;
