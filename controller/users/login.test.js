const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
 } = require("@jest/globals");

const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

mongoose.set('strictQuery', false);

const app = require("../../app");
const { DB_HOST, PORT = 3000 } = process.env;

const globalDatabase = mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT, function () {
    console.log(`Database connection successful`);
  });
})
.catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});


describe("test login user", () => {
  beforeAll(() => {
    return globalDatabase
  });

  afterAll(() => mongoose.disconnect(DB_HOST));

  test("login return status 200", async () => {
    const newUser = {
      email: "testMail@post.com",
      password: "111111",
    };
  
    const response = await request(app)
    .post("api/users/login")
    .send(newUser)
    .set('Accept', 'application/json') ;
    expect(response.status).toBe(200);
    expect(isObject(response.body)).toBe(true);
    const {body} = response;
    expect(body.token).toBeTruthy();
    const {user} = response.body;
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
    request.end()
    
  });
 
});


function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

