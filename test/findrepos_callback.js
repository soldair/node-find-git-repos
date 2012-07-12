var test = require('tap').test;
var path = require('path');
var findrepos = require('../findrepos.js');

test('can find repos with callback',function(t){
  findrepos(__dirname+'/../',function(err,repos){
    //
    console.log(repos);
    var root = path.normalize(__dirname+'/../');
    t.ok(repos[root],'should have found this git repo');
    t.ok(repos[root].indexOf('node-find-git-repos.git'),'should have found the origin');
    t.end();
  });
});


