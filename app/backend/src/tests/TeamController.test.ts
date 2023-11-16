import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams.model';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('TeamsController', () => {
  let findOneStub: sinon.SinonStub;

  beforeEach(() => {
    findOneStub = sinon.stub(Teams, 'findByPk');
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it('should get team by ID', async () => {
    const mockTeam = { id: 5, name: 'Cruzeiro' };
    findOneStub.resolves(mockTeam);

    const res = await request(app).get('/teams/5');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(mockTeam);
  });

  it('should handle team not found', async () => {
    findOneStub.resolves(null);

    const res = await request(app).get('/teams/30');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(null);
  });
});
