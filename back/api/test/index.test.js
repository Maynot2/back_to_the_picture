//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
// const should = chai.should();
chai.use(chaiHttp);

const app = require('../app');
const User = require('../models/users')

const request = require('supertest');
// const Pool = require('pg-pool')
// const client = require('./poolClient')

describe('/GET /api/users', () => {
      it('should GET all the users', async () => {
      let res = await chai
        .request(app)
        .get('/api/users')
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.lengthOf(6);
      // expect(res.body).length.equal(6)
      });
  });

describe('/GET /api/users/2', () => {
      it('should GET an user by id', async () => {
      let res = await chai
        .request(app)
        .get('/api/users/2')
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      });
});

describe("GET /api/users/1000", () => {
    it('should return a 404 response', async () => {
    let res = await chai
      .request(app)
      .get('/api/users/1000')
    expect(res).to.have.status(404);
    console.log(res);
    // expect(res.body).to.be.empty;
    // expect(res.length)
    //   .to.be.greaterThan(0, "Could not find user for the provided id.");
    });
});
    
describe('/GET /api/users/name/god', () => {
  it('it should GET an user by name', async () => {
  let res = await chai
    .request(app)
    .get('/api/users/name/god')
    expect(res).to.have.status(200);
  });
});

describe('/GET /api/users/name/xxx', () => {
  it('should return a 404 response', async () => {
  let res = await chai
    .request(app)
    .get('/api/users/name/xxx')
    expect(res).to.have.status(404);
  });
});

describe("POST /api/users/signup", () => {
	it("should return status 201", async () => {
    	let res = await chai
        .request(app)
        .post('/api/users/signup')
        .send({name: "charlie", email: "charlie@test.com", password: "password", role: "admin"})
    	expect(res.status).to.equal(201)
	});
	// afterEach(async () => {
  //   	await User.delete({name: "Charlie"})
	// });
});
