var EventEmitter = require('events').EventEmitter
, exec = require('child_process').exec
, fs = require('fs')
, walkdir = require('walkdir');

module.exports = function(paths,cb){
  if(typeof paths == 'string') {
    paths = [paths];
  }

  var outem = new EventEmitter();
  paths.forEach(function(path,k){
    var em = walkdir(path)
    , jobs = 1
    , done = function(){
      process.nextTick(function(){
        jobs--;
        if(!jobs) outem.emit('end');
      });
    };

    em.on('directory',function(path,stat){
      if(path.lastIndexOf('.git') === path.length-4) {
        jobs++;
        var repo = path.substr(0,path.length-4);
        getOrigin(repo,function(err,remote){
          done();
          if(err) return em.emit('error',err);
          outem.emit('repo',repo,remote);
        });

      }
    });

    em.on('error',function(){
      outem.emit.apply(outem,arguments);
      //no more events!
      outem.emit = function(){};
    });

    em.on('end',function(){
      done(); 
    });
  });

  if(cb) {
    outem.on('error',function(err){
      cb(err); 
    });

    var repos = {};

    outem.on('repo',function(repo,remote){
      repos[repo] = remote;
    });

    outem.on('end',function(){
      cb(undefined,repos);    
    });
  }

  return outem;
}

function getOrigin(repo,cb){
  fs.readFile(repo+'/.git/config',function(err,data){
    if(err) return cb(err);
    var sections = data.toString().split(/^\[/gm);
    var remote;
    sections.forEach(function(section,i){
      if(section.indexOf('remote "origin"') === 0) {
        var matches = section.match(/^[\s]+url = (.+)$/m);
        if(matches) {
          remote = matches[1].trim();
          return false;
        }
      }
    });
    cb(undefined,remote);
  });
}

