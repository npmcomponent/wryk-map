*This repository is a mirror of the [component](http://component.io) module [wryk/map](http://github.com/wryk/map). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/wryk-map`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# Map

Map object like es6 Map


## Installation
Map use [component(1)](https://github.com/component/component)
```batch
$ component-install wryk/map
```

Without [component(1)](https://github.com/component/component), just include `map.js` or `map.min.js` inside your scripts.
 

## Usage
```javascript
var configuration = new Map({
	string: 'myString',
	number: 1337
});

configuration.get('number'); //=> 1137

var object = {};
configuration.set(object, 'object as key');

configuration.has('foo'); //=> false
configuration.size; //=> 3

configuration.delete('number'); //=> true

var context = {};
configuration.forEach(function (value, key, map) {
	// iterate over map ...
}, context);


var iterator = configuration.entries();
var entry;
while ((entry = iterator.next()) !== null) {
	// iterate over map ...
}
```

## API
#### new Map(object)
#### #get(key)
#### #set(key, value)
#### #delete(key)
#### #has(key)
#### #clear()
#### #size
#### #forEach(callback, context)
#### #iterator(kind)
#### #keys()
#### #values()
#### #entries()

## Running tests
```batch
$ npm install
$ npm test
```

## License
MIT