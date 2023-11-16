import * as chai from 'chai';
import loginValidation from '../middlewares/loginValidation';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('loginValidation', () => {
  it('should validate a valid email', async () => {
    const isValid = await loginValidation.isEmailValid('user@example.com');
    expect(isValid).to.be.true;
  });

  it('should invalidate an invalid email', async () => {
    const isValid = await loginValidation.isEmailValid('invalid-email');
    expect(isValid).to.be.false;
  });

  it('should validate a valid password', async () => {
    const isValid = await loginValidation.isPasswordValid('validPass');
    expect(isValid).to.be.true;
  });

  it('should invalidate a short password', async () => {
    const isValid = await loginValidation.isPasswordValid('short');
    expect(isValid).to.be.false;
  });

  // Add more test cases as needed
});
