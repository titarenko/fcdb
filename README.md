fcdb
====

Implementation of lite in-memory collection storage with possibility of file backup.

[![Build Status](https://secure.travis-ci.org/titarenko/fcdb.png?branch=master)](https://travis-ci.org/titarenko/fcdb) [![Coverage Status](https://coveralls.io/repos/titarenko/fcdb/badge.png)](https://coveralls.io/r/titarenko/fcdb)

[![NPM](https://nodei.co/npm/fcdb.png?downloads=true&stars=true)](https://nodei.co/npm/fcdb/)

Installation
------------

```bash
npm install fcdb --save
```

Example
-------

```js
var Db = require('fcdb');

var db = new Db({
	collections: ['fruits', 'juices'],
	file: '/var/backup.json'
});

db.fruits.push({
	name: 'apple',
	weight: 0.12
}); // db.fruits is just ordinary JS array

db.fruits.push({
	name: 'orange',
	weight: 0.34
});

console.log(_.max(db.fruits, 'weight').name); // orange
console.log(_.find(db.fruits, function (it) { return it.name == 'apple'; }).weight); // 0.12

db.flush().then(function () {
	console.log('everything is successfuly persisted to /var/backup.json');
});
```

API
---

# Db(options)

Accepts object with 2 properties: `collections` and `file` which are list of collection names and path to backup file.
Reads backup file and initializes in-memory store, or (if latter is impossible) initializes each collection as empty one.

# #flush()

Promises saving collections to backup file.

License (BSD)
-------------

Copyright (c) 2014, Constantin Titarenko

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
