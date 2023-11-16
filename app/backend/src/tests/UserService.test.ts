import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as sinon from 'sinon';
import UsersService from '../services/users.service';
import loginValidation from '../middlewares/loginValidation';
import Users from '../database/models/Users.model';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('UsersService', () => {
  let findOneStub: sinon.SinonStub;
  let isEmailValidStub: sinon.SinonStub;
  let isPasswordValidStub: sinon.SinonStub;

  beforeEach(() => {
    findOneStub = sinon.stub(Users, 'findOne');
    isEmailValidStub = sinon.stub(loginValidation, 'isEmailValid');
    isPasswordValidStub = sinon.stub(loginValidation, 'isPasswordValid');
  });

  afterEach(() => {
    findOneStub.restore();
    isEmailValidStub.restore();
    isPasswordValidStub.restore();
  });

  it('should return 400 if email or password is missing', async () => {
    const result = await UsersService.login('', 'password');
    expect(result.status).to.equal(400);
    expect(result.data.message).to.equal('All fields must be filled');
  });

  it('should return 401 for invalid email or password', async () => {
    findOneStub.resolves(null);
    isEmailValidStub.returns(true);
    isPasswordValidStub.returns(true);

    const result = await UsersService.login('test@example.com', 'invalidPassword');

    expect(result.status).to.equal(401);
    expect(result.data.message).to.equal('Invalid email or password');
  });

  it('should return 200 with a valid token for correct email and password', async () => {
    const hashedPassword = bcrypt.hashSync('password', 10);
    const userData = {
      email: 'test@example.com',
      password: hashedPassword,
    };

    findOneStub.resolves(userData);
    isEmailValidStub.returns(true);
    isPasswordValidStub.returns(true);

    const result = await UsersService.login('test@example.com', 'password');

    expect(result.status).to.equal(200);
    expect(result.data.token).to.be.a('string');
  });
});