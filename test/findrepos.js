var test = require('tap').test

test('test can find repo',function(t){
  var finder = require(__dirname+'/../findrepos.js');

  var em = finder('../');
  var repos = [];
  var found = false;

  em.on('repo',function(repo,remote){
    
    repos.push(arguments);
    if(remote.indexOf('node-find-git-repos.git') > -1){
      found = true;
    }

  });

  em.on('end',function(){
     t.ok(found,'find myself');
     t.ok(repos.length > 0,'found repos');
     t.end();
  });

});

