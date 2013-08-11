var is = require('is');
var properties = require('properties');

module.exports = Map;



var slice = Array.prototype.slice;
var descriptor = {
	configurable: true,
	enumerable: false
};






function Entry (key, value) {
	this.key = key;
	this.value = value;
	this.next = null;
}








function Iterator (map, kind) {
	this.cursor = map._head;
	this.kind = kind;
}

properties(Iterator.prototype, {
	next: function () {
		var cursor = this.cursor;

		cursor = cursor.next;
		this.cursor = cursor;

		var kind = this.kind;
		if (kind === 'key') {
			return cursor.key;
		} else if (kind === 'value') {
			return cursor.value;
		} else {
			return [cursor.key, cursor.value];
		}
	},
	toString: function () {
		return '[object Map Iterator]';
	}
}, descriptor);










function Map () {
	properties(this, {
		'_size': 0,
		'_head': { next: null }
	}, descriptor);

	var entries = slice.call(arguments, 0);
	entries.forEach(function (entry) {
		this.set(entry[0], entry[1]);
	}, this);
}

properties(Map.prototype, {
	size: function () {
		return this._size;
	}
}, descriptor, 'get');

properties(Map.prototype, {
	get: function (key) {
		var cursor = this._head;

		while (cursor = cursor.next) {
			if (is(key, cursor.key)) {
				return cursor.value;
			}
		}

		return undefined;
	},
	set: function (key, value) {
		var cursor = this._head;
		var previous = cursor;

		while (cursor = cursor.next) {
			if (is(key, cursor.key)) {
				cursor.value = value;
				return;
			}

			previous = cursor;
		}

		cursor.next = new Entry(key, value);
		this._size++;
	},
	has: function (key) {
		var cursor = this._head;

		while (cursor = cursor.next) {
			if (is(key, cursor.key)) {
				return true;
			}
		}

		return false;
	},
	'delete': function (key) {
		var cursor = this._head;
		var previous = cursor;

		while (cursor = cursor.next) {

			if (is(key, cursor.key)) {
				previous.next = cursor.next;

				this._size--;
				return true;
			}

			previous = cursor;
		}

		return false;
	},
	clear: function () {
		var cursor = this._head;
		var previous = cursor;

		while (cursor = cursor.next) {
			previous.next = null;
			previous = cursor;
		}

		this._size = 0;
	},
	forEach: function (callback, context) {
		context = context || null;
		var that = this;

		cursor = this._head;

		while (cursor = cursor.next) {
			callback.call(context, cursor.value, cursor.key, that);
		}

	},
	keys: function () {
		return new Iterator(this, 'key');
	},
	values: function () {
		return new Iterator(this, 'value');
	},
	entries: function () {
		return new Iterator(this, 'key+value');
	},
	toString: function () {
		return '[object Map]';
	}
}, descriptor);