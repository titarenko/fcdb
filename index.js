var Q = require('q');
var fs = require('fs');
var _ = require('lodash');
var debug = require('debug')('fcdb');

var writeFile = Q.denodeify(fs.writeFile);

function Db (options) {
	if (!options) {
		throw new Error('no options specified');
	}

	if (!options.collections) {
		throw new Error('no collections specified');
	}

	if (!options.file) {
		throw new Error('no backup file specified');
	}

	this._collections = options.collections;
	this._file = options.file;

	var empty = _.range(this._collections.length).map(function () { return []; });
	_.defaults(this, _.zipObject(this._collections, empty));

	try {
		var cache = fs.readFileSync(this._file, { encoding: 'utf8' });
		_.extend(this, _.pick(JSON.parse(cache), this._collections));
	} catch (error) {
		error && debug('failed to deserialize collections from backup file', error.stack || error);
	}
}

Db.prototype.flush = function flush (file) {
	var cache = _.pick(this, this._collections);
	return writeFile(file || this._file, JSON.stringify(cache));
};

module.exports = Db;
