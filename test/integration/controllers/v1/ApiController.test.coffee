###*
# ApiController.test
###

request = require('supertest')
should = require('should')

###*
# Test API "ping" endpoint.
###

describe 'Requests to the root (/api) path', ->
  it 'GET: Returns a 200 status code', (done) ->
    request(sails.hooks.http.app)
      .get('/api')
      .expect 200, done
    return
  it 'GET: Returns JSON format', (done) ->
    request(sails.hooks.http.app)
      .get('/api')
      .expect 'content-type', /json/, done
    return
  it 'GET: Redirects to v1 path and returns v1 route details', (done) ->
    request(sails.hooks.http.app)
      .get('/api')
      .expect('content-type', /json/)
      .end (err, res) ->
        if err
          throw err
        res.body.should.have.property 'v1'
        res.body.v1.should.endWith '/api/v1'
        done()
        return
    return
  return

###*
# Test API V1 information / status endpoint.
###

describe 'Requests to v1 root (/api/v1) path', ->
  it 'GET: Returns a 200 status code', (done) ->
    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect 200, done
    return
  it 'GET: Returns v1 paths', (done) ->
    request(sails.hooks.http.app)
      .get('/api/v1')
      .expect('content-type', /json/)
      .end (err, res) ->
        if err
          throw err
        res.body.should.have.property 'user'
        res.body.user.should.have.property 'register'
        res.body.user.register.should.endWith '/api/v1/user/register'
        res.body.user.should.have.property 'password'
        res.body.user.password.should.endWith '/api/v1/user/password'
        done()
        return
    return
  return
