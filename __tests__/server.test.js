const mongoose = require('mongoose');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('Testing responses of key url paths', () => {
    describe('GET Requests', () => {
      it('root responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });

      it('server responds with 404 status when given a bad request', () => {
        return request(server)
          .get('/pizza')
          .expect('Content-Type', /text\/html/)
          .expect(404);
      });

      it('board responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/board')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('Testing controller middleware with key functionality', () => {
    describe('Category Controller', () => {
      it('Get responds with json content type', () => {
        return request(server)
          .get('/route/category')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('Get responds with array of category objects stored in the database', () => {
        return request(server)
          .get('/route/category')
          .then(response => {
            expect(typeof response.body).toEqual('object');
            expect(response.body.length).not.toEqual(undefined);
          });
      });
    });

    describe('User Controller', () => {
      it('Get responds with json content type', () => {
        return request(server)
          .get('/route/user')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('Get responds with array of category objects stored in the database', () => {
        return request(server)
          .get('/route/user')
          .then(response => {
            expect(typeof response.body).toEqual('object');
            expect(response.body.length).not.toEqual(undefined);
          });
      });
    });

    describe('Task Controller', () => {
      it('Get responds with json content type', () => {
        return request(server)
          .get('/route/task')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('Get responds with array of category objects stored in the database', () => {
        return request(server)
          .get('/route/task')
          .then(response => {
            expect(typeof response.body).toEqual('object');
            expect(response.body.length).not.toEqual(undefined);
          });
      });
    });
  });
});