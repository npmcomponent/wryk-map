;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("matthewp-is/index.js", function(exports, require, module){
// http://wiki.ecmascript.org/doku.php?id=harmony:egal

module.exports = Object.is || function(x, y) {
  if (x === y) {
  // 0 === -0, but they are not identical
    return x !== 0 || 1 / x === 1 / y;
  }
                                          
  // NaN !== NaN, but they are identical.
  // NaNs are the only non-reflexive value, i.e., if x !== x,
  // then x is a NaN.
  // isNaN is broken: it converts its argument to number, so
  // isNaN("foo") => true
  return x !== x && y !== y;
};

});
require.register("map/index.js", function(exports, require, module){
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
 * @return {Map}
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
 * @param {any} key
 * @param {any} value
**/
Map.prototype.set = function (key, value) {
	var index = indexOf.call(this._keys, key);
	
	if (index > -1) {
		this._values[index] = value;
		return;
	}

	this._keys.push(key);
	this._values.push(value);
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
});
require.alias("matthewp-is/index.js", "map/deps/is/index.js");
require.alias("matthewp-is/index.js", "is/index.js");

require.alias("map/index.js", "map/index.js");if (typeof exports == "object") {
  module.exports = require("map");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("map"); });
} else {
  this["Map"] = require("map");
}})();