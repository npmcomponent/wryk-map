var is = require('is');

module.exports = Map;

/**
 * @param {any} element
 * @return {Number}
**/
function indexOf (element) {
	for (var i = this.length; i-- && !is(this[i], element);) {}
	return i;
}




/**
 * @class Map
 * @constructor
 * @param {Array} iterable
**/
function Map (iterable) {
	this._keys = [];
	this._values = [];

	if (iterable) {
		for (var i = -1, l = iterable.length; ++i < l;) {
			this.set(iterable[i][0], iterable[i][1]);
		}
	}
}

/**
 * get entry value associated with `key`
 * @method get
 * @param {any} key
 * @return {any}
**/
Map.prototype.get = function (key) {
	return this._values[indexOf.call(this._keys, key)];
};

/**
 * set entry value associated with `key`
 * @method set
 * @chainable
 * @param {any} key
 * @param {any} value
 * @return {Hash}
**/
Map.prototype.set = function (key, value) {
	var index = indexOf.call(this._keys, key);
	
	if (index > -1) {
		this._values[index] = value;
	} else {
		this._keys.push(key);
		this._values.push(value);
	}

	return this;
};

/**
 * remove entry key and value with `key`
 * @method delete
 * @param {any} key
 * @return {Boolean}
**/
Map.prototype.delete = function (key) {
	var index = indexOf.call(this._keys, key);

	if (index > -1) {
		this._keys.splice(index, 1);
		this._values.splice(index, 1);	
		return true;
	}

	return false;
};

/**
 * entry existence
 * @method has
 * @param {any} key
 * @return {Boolean}
**/
Map.prototype.has = function (key) {
	return indexOf.call(this._keys, key) > -1 ? true : false;
};


/**
 * remove all entries
 * @method clear
**/
Map.prototype.clear = function () {
	this._keys.splice(0);
	this._values.splice(0);
};

/**
 * numbers of entries
 * @readonly
 * @property size
 * @type {Number}
 * @default 0
**/
Object.defineProperty(Map.prototype, 'size', {
	configurable: true,
	get: function () {
		return this._keys.length;
	}
});

/**
 * call `callback` with `context` as this for all entries with (value, key, hash)
 * @method forEach
 * @param {Function} callback
 * @param {Object} context
**/
Map.prototype.forEach = function (callback, context) {
	for (var i = -1, l = this._keys.length; ++i < l;) {
		callback.call(context, this._values[i], this._keys[i], this);
	}
};

/**
 * iterator over `kind`
 * @method iterator
 * @param {String} kind
 * @return {MapIterator}
**/
Map.prototype.iterator = function (kind) {
	return new MapIterator(this, kind);
};

/**
 * iterator over keys
 * @method keys
 * @return {MapIterator}
**/
Map.prototype.keys = function () {
	return this.iterator('key');
};

/**
 * iterator over values
 * @method values
 * @return {MapIterator}
**/
Map.prototype.values = function () {
	return this.iterator('value');
};

/**
 * iterator over entries
 * @method entries
 * @return {MapIterator}
**/
Map.prototype.entries = Map.prototype.__iterator__ = function () {
	return this.iterator('key+value');
};




/**
 * @class MapIterator
 * @constructor
 * @param {Map} map
 * @param {String} kind
 * @return {MapIterator}
**/
function MapIterator (map, kind) {
	this._index = 0;
	this._keys = map._keys;
	this._values = map._values;
	this._kind = kind;
}

/**
 * iterate over key/value/entry
 * @method next
 * @return {any}
**/
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