# component-skeleton
  
  boilerplate for components

## Configuration
  You can configure few options in Makefile :
  * COMPONENT_NAME : build file name
  * STANDALONE_VARIABLE : component name in no AMD and no CommonJS environnement
  * DEVELOPMENT_MODE : true if you want use --dev flag in component building
  * MOCHA_REPORTER : mocha reporter name

## Conventions

### Installation
  Simply run :
```batch
$ npm install
$ make install
```

### Source code
  LiveScript can be used in src/ directory, and compiled to lib/ directory with :
```batch
$ make watch
```
  Don't forget add your files in the component.json file


### Tests
  LiveScript are always used for tests
  Build and run with :
```batch
$ make test
```

  Just run with :
```batch
$ make test-without-build
```

### Cleaning
  Delete components/ and build/ directories with :
```batch
$ make clean
```