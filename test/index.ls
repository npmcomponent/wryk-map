should = require 'chai' .should!
Map = require '../build/'

object = {}
foo = ->
bar = ->

describe 'new Map(iterable)' (...) !->
	map = new Map [
		<[a aa]>
		<[b bb]>
	]

	it "should initialize key/value entries from iterable" !->
		map.get 'a' .should.be.equal 'aa'
		map.get 'b' .should.be.equal 'bb'


	describe '#get(key)' (...) !->
		it "should return the key value or undefined" !->
			map.get 'a' .should.be.equal 'aa'
			should.not.exist map.get 'z'


	describe '#set(key)' (...) !->
		it "should set a new key/value entry or override existing entry" !->
			map.set 'c' 'ccc'
			map.get 'c' .should.be.equal 'ccc'

			map.set 'c' 'cc'
			map.get 'c' .should.be.equal 'cc'

		it "should still work with no string-based keys" !->
			map.set object, 'oo'
			map.set foo, 'foo'
			map.set bar, 'bar'

			map.get object .should.be.equal 'oo'
			map.get foo .should.be.equal 'foo'
			map.get bar .should.be.equal 'bar'

		it "should take care about zero and NaN keys" !->
			map.set -0 '-0'
			map.set +0 '+0'
			map.set NaN, 'NaN'
			
			map.get -0 .should.be.equal '-0'
			map.get +0 .should.be.equal '+0'
			map.get NaN .should.be.equal 'NaN'

		it "is chainable" !->
			map.set 'c' 'cc' .should.be.equal map


	describe '#delete(key)' (...) !->
		it "should remove a key/value entry" !->
			should.exist map.get 'c'
			map.delete 'c'
			should.not.exist map.get 'c'

		it "should return true if an entry are deleted" !->
			map.set 'c' 'cc'
			map.delete 'c' .should.be.true

		it "should return false if an entry not are deleted" !->
			map.delete 'c' .should.be.false


	describe '#has(key)' (...) !->
		it "should return true if key/value entry is defined" !->
			map.has 'a' .should.be.true
			map.has NaN .should.be.true
			map.has foo .should.be.true

		it "should return false if key/value entry is not defined" !->
			map.has 'z' .should.be.false
			map.has {} .should.be.false
			map.has -> .should.be.false


	describe '#clear()' (...) !->
		it "should delete all key/value entries" !->
			map.clear!
			map.size.should.be.equal 0


	describe '#size' (...) !->
		it "should return the number of entries" !->
			map.size.should.be.equal 0
			map.set 'a' 'aa'
			map.size.should.be.equal 1


	describe '#forEach(callback [, context])' (...) !->
		it "should call callback for all entries with (value, key, map)" !->
			map.set 'b' 'bb'
			map.set 'c' 'cc'

			counter = 0
			map.forEach (value, key, m) !->
				counter++
				value.should.be.equal map.get key
				m.should.be.equal map

			counter.should.be.equal map.size

		it "should use context as current context" !->
			context = {}
			map.forEach do
				!-> @should.be.equal context
				context


	describe '#keys()' (...) !->
		it "should return a map keys iterator" !->
			iterator = map.keys!

			while (key = iterator.next!) != null
				map.has key .should.be.true


	describe '#values()' (...) !->
		it "should return a map values iterator" !->
			iterator = map.values!

			while (value = iterator.next!) != null
				found = false

				map.forEach !-> found := true if it == value

				found.should.be.true		


	describe '#entries()' (...) !->
		it "should return a map entries iterator" !->
			iterator = map.entries!

			while (entry = iterator.next!) != null
				[key, value] = entry
				map.get key .should.be.equal value