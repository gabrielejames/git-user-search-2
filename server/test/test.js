let expect  = require('chai').expect;
let request = require('request');

describe('content for github user fetch', function() {
    describe ('gitHub user fetch', function() {
        
        it('content', function(done) {
            request('http://localhost:3001/github/gabrielejames',
                    function(error, response, body) {
                expect(body).to.include("login", "id", "url", "repos_url");
                done();
}); });
        
}); });

describe('content for gitlab user fetch', function() {
    describe ('gitLab user fetch', function() {
        
        it('content', function(done) {
            request('http://localhost:3001/gitlab/gabrielejames',
                    function(error, response, body) {
                expect(body).to.include("username", "id", "web_url", "projects");
                done();
}); });
        
}); });

describe('content for github repos fetch', function() {
    describe ('gitLab user fetch', function() {
        
        it('content', function(done) {
            request('http://localhost:3001/githubrepos/defunkt',
                    function(error, response, body) {
                expect(body).to.include("name", "id", "description", "commits_url");
                done();
}); });
        
}); });