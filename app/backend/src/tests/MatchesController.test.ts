import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesService from '../services/matches.service';
import ModelMatches from '../model/modelMatches';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('MatchesController', () => {
  let getAllMatchesStub: sinon.SinonStub;
  let getAllMatchesInProgressStub: sinon.SinonStub;
  let finishMatchByIdStub: sinon.SinonStub;
  let updateScoreStub: sinon.SinonStub;
  let createMatchStub: sinon.SinonStub;

  beforeEach(() => {
    getAllMatchesStub = sinon.stub(MatchesService.prototype, 'getAllMatches');
    getAllMatchesInProgressStub = sinon.stub(MatchesService.prototype, 'getAllMatchesInProgress');
    finishMatchByIdStub = sinon.stub(MatchesService.prototype, 'finishMatchById');
    updateScoreStub = sinon.stub(MatchesService.prototype, 'updateScore');
    createMatchStub = sinon.stub(MatchesService.prototype, 'createMatch');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get all matches', async () => {
    const mockMatches = [{ id: 1, team1: 'Team A', team2: 'Team B' }];
    getAllMatchesStub.resolves(mockMatches);

    const res = await request(app).get('/matches');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(mockMatches);
  });

  it('should get all matches in progress', async () => {
    const mockMatchesInProgress = [{ id: 1, team1: 'Team A', team2: 'Team B' }];
    getAllMatchesInProgressStub.resolves(mockMatchesInProgress);

    const res = await request(app).get('/matches?inProgress=true');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(mockMatchesInProgress);
  });

  it('should finish a match by ID', async () => {
    const teamId = '1';
    finishMatchByIdStub.resolves();

    const res = await request(app).put(`/matches/${teamId}/finish`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ message: 'Finished' });
  });

  it('should update the score of a match by ID', async () => {
    const teamId = '1';
    const scoreUpdatedData = { homeTeamGoals: 2, awayTeamGoals: 1 }; // Adjust the property names
    updateScoreStub.resolves();

    const res = await request(app)
      .put(`/matches/${teamId}/update-score`)
      .send(scoreUpdatedData);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ message: 'Score updated' });
  });

  it('should create a new match', async () => {
    const newMatch = { team1: 'Cruzeiro', team2: 'Bahia' };
    const createdMatch = { id: 1, ...newMatch };
    createMatchStub.resolves(createdMatch);

    const res = await request(app)
      .post('/matches')
      .send(newMatch);

    expect(res).to.have.status(201);
    expect(res.body).to.deep.equal(createdMatch);
  });
});
