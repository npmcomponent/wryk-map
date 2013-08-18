var is = require('is');
var properties = require('properties');

module.exports = Map;


function indexOf (element) {
	for (var i = this.length; i-- && !is(this[i], element););
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
	return this._keys;
};

Map.prototype.values = function () {
	return this._values;
};

Map.prototype.entries = function () {
	var items = [];

	for (var i = -1, l = this._keys.length; ++i < l;) {
		items.push([this._keys[i], this._values[i]]);
	}

	return items;
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
	.property('size').getter(function () { return this._keys.length ; }).define()
;



function MapIterator (map, kind) {
	this._index = 0;
	this._map = map;
	this._kind = kind;
}

MapIterator.prototype.next = function () {
	switch (this._kind) {
		case 'keys':
			return this._map._keys[this._index++];
		break;

		case 'values':
			return this._map.values[this._index++];
		break;

		case 'keys+values':
			var i = this._index;
			this._index++;
			return [this._map._keys[i], this._map._values[i]];
		break;
	}
};

properties(MapIterator.prototype)
	.default({ configurable: true })
	.property('next').value().define()
;