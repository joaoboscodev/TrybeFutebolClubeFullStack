import * as sinon from 'sinon';
import * as chai from 'chai';

import TeamsService from '../services/teams.services';
import Teams from '../database/models/Teams.model';

const { expect } = chai;

describe('TeamsService', () => {
  let findAllStub: sinon.SinonStub;
  let findByPkStub: sinon.SinonStub;

  beforeEach(() => {
    findAllStub = sinon.stub(Teams, 'findAll');
    findByPkStub = sinon.stub(Teams, 'findByPk');
  });

  afterEach(() => {
    findAllStub.restore();
    findByPkStub.restore();
  });

  it('should get all teams', async () => {
    const mockTeams = [{ id: 1, name: 'Team 1' }, { id: 2, name: 'Team 2' }];
    findAllStub.resolves(mockTeams);

    const result = await TeamsService.getAll();

    expect(result).to.deep.equal(mockTeams);
  });

  it('should get team by ID', async () => {
    const mockTeam = { id: 1, name: 'Mock Team' };
    findByPkStub.resolves(mockTeam);

    const result = await TeamsService.getByID(1);

    expect(result).to.deep.equal(mockTeam);
  });
});