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
mongoose.set("strictQuery", false);

const app = require("../../app");
const { DB_HOST, PORT = 3000 } = process.env;

const globalDatabase = mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

const testUser = {
  email: "testUser@post.com",
  password: "123456",
};

describe("test login user", () => {
  beforeAll(async () => await globalDatabase);

  afterAll(async () => await mongoose.connection.close());

  test("login return status 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(testUser)
      .set("Accept", "application/json");

    const { token, user } = response.body.data;
    expect(response.status).toEqual(200);
    expect(token).toBeTruthy();
    expect(user).toBeDefined();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
