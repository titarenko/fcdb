var fs = require('mock-fs');
var should = require('should');
var Db = require('../');

describe('Db', function () {

	describe('#ctor(options)', function () {
		beforeEach(function () {
			fs({
				'/var/data.json': null
			});
		});

		afterEach(function () {
			fs.restore();
		});

		it('should initialize empty collections if no backup is available', function () {
			var db = new Db({
				collections: ['foo', 'bar', 'baz'],
				file: '/var/data.json'
			});
			db.foo.should.be.instanceof(Array).and.have.lengthOf(0);
			db.bar.should.be.instanceof(Array).and.have.lengthOf(0);
			db.baz.should.be.instanceof(Array).and.have.lengthOf(0);
		});
	});

});
