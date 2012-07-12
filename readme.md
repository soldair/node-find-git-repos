
[![Build Status](https://secure.travis-ci.org/soldair/node-find-git-repos.png)](http://travis-ci.org/soldair/node-find-git-repos)

## find-git-repos

this walks a path or paths, finds all of the git repositories, and their origins

## example

```js

var findrepos = require('find-git-repos');

findrepos('../',function(err,repos){
  console.log('all of my repos! ',repos);
});


// with event emitter

var em = findrepos('../../');

em.on('repo',function(repo,remote){
  console.log('found repo ',remote,' at ',repo);
});

em.on('end',function(){
  console.log('all done!');
})

em.on('error',function(){
  console.log('the path i specified must not exist or is in accesible');
});

```

## api

findrepos(path or an array of paths,callback)
  - returns EventEmitter finder
  - callback(err,repos)
    repos is an object keyed off of the directory with the remote origin as the values

emitter events
  repo
    the repostory info
      (repo dir, repo remote)

  end
    im done looking
      no arguments

  error
    if any paths are inaccessable
      (the error)







