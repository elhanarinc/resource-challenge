let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Resource', () => {
  let firstUserData = { 'name': 'arinc', 'email': 'arinc@gmail.com', 'password': 'arinc' };
  let secondUserData = { 'name': 'deneme', 'email': 'deneme@gmail.com', 'password': 'deneme' };
  let thirdUserData = { 'name': 'final', 'email': 'final@gmail.com', 'password': 'final' };
  before((done) => {
    chai.request(server)
      .get('/users/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .get('/resource/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  after((done) => {
    chai.request(server)
      .get('/resource/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  after((done) => {
    chai.request(server)
      .get('/resource/drop')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  describe('Resource Insert', () => {
    let firstUserToken;
    let secondUserToken;
    let thirdUserToken;
    let resourceGetToken;
    it('it should register first user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(firstUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          firstUserToken = res.body.token;
          done();
        });
    });
    it('it should register second user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(secondUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          secondUserToken = res.body.token;
          done();
        });
    });
    it('it should register third user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(thirdUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          thirdUserToken = res.body.token;
          done();
        });
    });
    it('it should insert 1 for firstUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', firstUserToken)
        .send({ 'number': 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should insert 2 for secondUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', secondUserToken)
        .send({ 'number': 2 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should insert 11 for firstUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', firstUserToken)
        .send({ 'number': 11 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should insert 3 for thirdUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', thirdUserToken)
        .send({ 'number': 3 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should insert 22 for secondUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', secondUserToken)
        .send({ 'number': 22 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should insert 33 for thirdUser', (done) => {
      chai.request(server)
        .post('/resource/insert')
        .set('Content-Type', 'application/json')
        .set('x-access-token', thirdUserToken)
        .send({ 'number': 33 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.eql('OK');
          done();
        });
    });
    it('it should pass login for firstUser', (done) => {
      chai.request(server)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(firstUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.auth.should.be.eql(true);
          res.body.should.have.property('token');
          resourceGetToken = res.body.token;
          done();
        });
    });
    it('it should get resource', (done) => {
      chai.request(server)
        .get('/resource/show')
        .set('Content-Type', 'application/json')
        .set('x-access-token', resourceGetToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('resource');
          res.body.resource.should.be.eql([1, 11, 2, 22, 3, 33]);
          done(err);
        });
    });
  });
});
