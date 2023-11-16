import * as chai from 'chai';
import * as sinon from 'sinon';
import UsersService from '../services/users.service';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('UsersController', () => {
  let loginStub: sinon.SinonStub;

  beforeEach(() => {
    loginStub = sinon.stub(UsersService, 'login');
  });

  afterEach(() => {
    loginStub.restore();
  });

  it('should login user successfully', async () => {
    const mockResult = { status: 200, data: { userId: 1, token: 'xyz' } };
    loginStub.resolves(mockResult);

    const res = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'password' });

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(mockResult.data);
  });

  it('should handle login failure', async () => {
    const mockResult = { status: 401, data: { error: 'Invalid credentials' } };
    loginStub.resolves(mockResult);

    const res = await request(app)
      .post('/login')
      .send({ email: 'invalid@example.com', password: 'wrongpassword' });

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal(mockResult.data);
  });
});
