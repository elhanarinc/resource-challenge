let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  let userData = { 'name': 'arinc', 'email': 'arinc@gmail.com', 'password': 'arinc' };
  before((done) => {
    chai.request(server)
      .get('/users/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  after((done) => {
    chai.request(server)
      .get('/users/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  describe('User Register/Login', () => {
    it('it should register a new user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          done();
        });
    });
    it('it should not register an added user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.result.should.be.eql('user was already registered');
          done();
        });
    });
    it('it should pass login', (done) => {
      chai.request(server)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          done();
        });
    });
    it('it should fail login with invalid email', (done) => {
      let userData = { 'name': 'arinc', 'email': 'arinc@arinc.com', 'password': 'arinc' };
      chai.request(server)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(false);
          res.body.result.should.be.eql('invalid email');
          done();
        });
    });
    it('it should fail login with invalid password', (done) => {
      let userData = { 'name': 'arinc', 'email': 'arinc@gmail.com', 'password': 'arinc123' };
      chai.request(server)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(false);
          res.body.result.should.be.eql('password and email did not match');
          done();
        });
    });
  });
});
