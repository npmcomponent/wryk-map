var is = require('is');

module.exports = Map;

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
	for (var i = -1, l = this._keys.length; ++i < l;) {
		if (is(key, this._keys[i])) {
			return this._values[i];
		}
	}

	return undefined;
};

Map.prototype.set = function (key, value) {
	for (var i = -1, l = this._keys.length; ++i < l;) {
		if (is(key, this._keys[i])) {
			this._values[i] = value;
			return;
		}
	}

	this._keys.push(key);
	this._values.push(value);
};

Map.prototype.has = function (key) {
	for (var i = -1, l = this._keys.length; ++i < l;) {
		if (is(key, this._keys[i])) {
			return true;
		}
	}

	return false;
};

Map.prototype.delete = function (key) {
	for (var i = -1, l = this._keys.length; ++i < l;) {
		if (is(key, this._keys[i])) {
			this._keys.splice(i, 1);
			this._values.splice(i, 1);
			return true;
		}
	}

	return false;
};

Map.prototype.clear = function () {
	this._keys.splice(0);
	this._values.splice(0);
};

Map.prototype.size = function () {
	return this._keys.length;
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