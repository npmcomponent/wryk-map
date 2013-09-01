var is = require('is');
var properties = require('properties');

module.exports = Map;


function indexOf (element) {
	for (var i = this.length; i-- && !is(this[i], element);) {}
	return i;
}

function Map (iterable) {
	this._keys = [];
	this._values = [];

	if (iterable) {
		for (var i = -1, l = iterable.length; ++i < l;) {
			this.set(iterable[i][0], iterable[i][1]);
		}
	}
}

Map.prototype.get = function (key) {
	return this._values[indexOf.call(this._keys, key)];
};

Map.prototype.set = function (key, value) {
	var index = indexOf.call(this._keys, key);
	
	if (index > -1) {
		this._values[index] = value;
		return;
	}

	this._keys.push(key);
	this._values.push(value);
};

Map.prototype.has = function (key) {
	return indexOf.call(this._keys, key) > -1 ? true : false;
};

Map.prototype.delete = function (key) {
	var index = indexOf.call(this._keys, key);

	if (index > -1) {
		this._keys.splice(index, 1);
		this._values.splice(index, 1);	
		return true;
	}

	return false;
};

Map.prototype.clear = function () {
	this._keys.splice(0);
	this._values.splice(0);
};

Map.prototype.forEach = function (callback, context) {
	for (var i = -1, l = this._keys.length; ++i < l;) {
		callback.call(context, this._values[i], this._keys[i], this);
	}
};

Map.prototype.keys = function () {
	return new MapIterator(this, 'key');
};

Map.prototype.values = function () {
	return new MapIterator(this, 'value');
};

Map.prototype.entries = Map.prototype.__iterator__ = function () {
	return new MapIterator(this, 'key+value');
};

Map.prototype.iterator = function (kind) {
	return new MapIterator(this, kind);
};

properties(Map.prototype)
	.default({ configurable: true })
	.property('get').value().define()
	.property('set').value().define()
	.property('has').value().define()
	.property('delete').value().define()
	.property('clear').value().define()
	.property('forEach').value().define()
	.property('keys').value().define()
	.property('values').value().define()
	.property('entries').value().define()
	.property('iterator').value().define()
	.property('__iterator__').value().define()
	.property('size')
		.getter(function () {
			return this._keys.length;
		}).define()
;



function MapIterator (map, kind) {
	this._index = 0;
	this._keys = map._keys;
	this._values = map._values;
	this._kind = kind;
}

MapIterator.prototype.next = function () {
	var key = this._keys[this._index] !== undefined ? this._keys[this._index] : null;
	var value = this._values[this._index] !== undefined ? this._values[this._index] : null;

	this._index++;

	switch (this._kind) {
		case 'key':
			return key;
		break;

		case 'value':
			return value;
		break;

		case 'key+value':
			return key != null || value != null ? [key, value] : null;
		break;
	}
};

properties(MapIterator.prototype)
	.default({ configurable: true })
	.property('next').value().define()
;