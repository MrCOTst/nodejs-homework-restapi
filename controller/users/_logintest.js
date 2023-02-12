// const {
//     describe,
//     expect,
//     it

//   } = require("@jest/globals");
// const {login} = require ('./login');
// const { User } = require("../../models");

// describe("test login user", () => {
//     it("login return status 200", async (done) => {

//         const mUserId = '604160bf244710506826c5bc';
        
//         // {
//         //   email: "testMail@post.com",
//         //   password: "111111",
//         // };

//         const user = {
//             _id: mUserId,
//             subscription: 'pro',
//             token:
//               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDE2MGJmMjQ0NzEwNTA2ODI2YzViYyIsImlhdCI6MTYxNTU0Mjg3MywiZXhwIjoxNjE1NTUwMDczfQ._3Q9Q9eoRIPn40B6ha-_Eybvp9GvZb1muv3BPiGStf4',
//             email: 'example@example.com',
//             password: '$2a$08$okH6376YlenyP1aDx3eJkuE6NoiQNWSXs66Mul0RQr1lrAR9S4pMi',
//             avatarURL: '604160bf244710506826c5bc\\1615557622893-default.png',
//           };

//           jest.spyOn(User, 'findOne').mockImplementationOnce(() => user);

         
//     });
// });