
const {
    describe,
    expect,
    it

  } = require("@jest/globals");


const request = require('supertest');
const jwt = require('jsonwebtoken');
// const fs = require('fs').promises;

require('dotenv').config();

const { User, newUser } = require('./help');
const app = require('../../app');
const { SECRET_KEY } = process.env;

const testToken = (payload, secret) => jwt.sign(payload, secret);
const token = testToken({ id: User._id }, SECRET_KEY);
User.token = token;

// jest.mock('./login.js');

describe('Testing the route api/users', () => {
    it('should return 200 status for login', async () => {
        const res = await request(app)
          .post(`/api/users/login`)
          .send(newUser)
          .set('Accept', 'application/json');
    
        expect(res.status).toEqual(200);
        expect(res.body).toBeDefined();
        
      });


})