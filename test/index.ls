should = require 'chai' .should!
Map = require '../build/'

describe "new Map(iterable)" (...) !->
	m = new Map [
		<[a aa]>
		<[b bb]>
	]

	it "should initialize key/value entries from iterable" !->
		m.get 'a' .should.be.equal 'aa'
		m.get 'b' .should.be.equal 'bb'

	describe ".get(key)" (...) !->
		it "should return the key value or undefined" !->
			m.get 'a' .should.be.equal 'aa'
			should.not.exist m.get 'z'

	describe ".set(key)" (...) !->
		it "should set a new key/value entry or override existing entry" !->
			m.set 'c' 'cc'
			m.get 'c' .should.be.equal 'cc'

		it "should still work with not string-based keys" !->
			o = {}
			m.set o, 'oo'
			m.get o .should.be.equal 'oo'

		it "should take care about zero and NaN keyss" !->
			m.set -0 '-0'
			m.get -0 .should.be.equal '-0'

			m.set +0 '+0'
			m.get +0 .should.be.equal '+0'

			m.set NaN, 'NaN'
			m.get NaN .should.be.equal 'NaN'

	describe ".delete(key)" (...) !->
		it "should remove a key/value entry" !->
			should.exist m.get 'c'
			m.delete 'c'
			should.not.exist m.get 'c'

		it "should return true if an entry are deleted" !->
			m.set 'c' 'cc'
			m.delete 'c' .should.be.true

		it "should return false if an entry not are deleted" !->
			m.delete 'c' .should.be.false


	describe ".has(key)" (...) !->
		it "should return true if key/value entry is defined" !->
			m.has 'a' .should.be.true

		it "should return false if key/value entry is not defined" !->
			m.has 'z' .should.be.false


	describe ".clear()" (...) !->
		it "should delete all key/value entries" !->
			m.clear!
			m.size.should.be.equal 0


	describe ".size" (...) !->
		it "should return the number of entries" !->
			m.size.should.be.equal 0
			m.set 'a' 'aa'
			m.size.should.be.equal 1

	describe ".forEach(callback [, context])" (...) !->
		it "should call callback for all entries with (value, key, map)" !->
			m.set 'b' 'bb'
			m.set 'c' 'cc'

			counter = 0
			m.forEach (value, key, map) !->
				counter++
				value.should.be.equal m.get key
				map.should.be.equal m

			counter.should.be.equal m.size

		it "should use context as current context" !->
			context = {}
			m.forEach do
				!-> @should.be.equal context
				context

	describe ".keys()" (...) !->
		it "should return a map keys iterator" !->
			iterator = m.keys!

			while (key = iterator.next!) != null
				m.has key .should.be.true

	describe ".values()" (...) !->
		it "should return a map values iterator" !->
			iterator = m.values!

			while (value = iterator.next!) != null
				found = false

				m.forEach !-> found := true if it == value

				found.should.be.true
				

	describe ".entries()" (...) !->
		it "should return a map entries iterator" !->
			iterator = m.entries!

			while (entry = iterator.next!) != null
				[key, value] = entry
				m.get key .should.be.equal value