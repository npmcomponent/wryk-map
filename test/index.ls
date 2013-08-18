require! {
	Map: '../build/map'
	should
}

describe "new Map(iterable)" (...) !->
	it "should return a new Map from iterable argument" !->
		map = new Map [<[reporter nyan]> ['timeout' 2000]]

		map.get 'reporter' .should.be.equal 'nyan'
		map.get 'timeout' .should.be.equal 2000

	describe ".get(key)" (...) !->
		it "should return the key value or undefined" !->
			map = new Map [<[reporter nyan]>]

			map.get 'reporter' .should.be.equal 'nyan'
			should.not.exist map.get 'timeout'

	describe ".set(key, value)" (...) !->
		it "should set key/value entry" !->
			map = new Map
			map.set 'reporter' 'nyan'
			map.set 'timeout' 2000

			map.get 'reporter' .should.be.equal 'nyan'
			map.get 'timeout' .should.be.equal 2000


		it "should override existing entry" !->
			map = new Map
			map.set 'reporter' 'nyan'
			map.set 'reporter' 'spec'

			map.get 'reporter' .should.be.equal 'spec'

	describe ".has(key)" (...) !->
		it "should return true if key is defined" !->
			map = new Map [<[reporter nyan]>]

			map.set 'timeout' 2000

			map.has 'reporter' .should.be.true
			map.has 'timeout' .should.be.true

		it "should return false if key isn't defined" !->
			map = new Map

			map.has 'reporter' .should.be.false

	describe ".delete(key)" (...) !->
		it "should delete key/value entry" !->
			map = new Map [<[reporter nyan]>]
			map.delete 'reporter'

			map.has 'reporter' .should.be.false

		it "should return true if an entry are deleted" !->
			map = new Map [<[reporter nyan]>]
			map.delete 'reporter' .should.be.true

		it "should return false if an entry are deleted" !->
			map = new Map
			map.delete 'reporter' .should.be.false

	describe ".clear()" (...) !->
		it "should delete all key/value entries" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]
			map.clear!

			map.has 'reporter' .should.be.false
			map.has 'timeout' .should.be.false
			map.size.should.be.equal 0

	describe ".size" (...) !->
		it "should return number of defined entries" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]

			map.size.should.be.equal 2

	describe ".forEach(callback [, context])" (...) !->
		it "should call callback for all entries with (value, key, map)" !->
			map = new Map [<[reporter nyan]>]

			map.forEach (value, key, currentMap) !->
				value.should.be.equal 'nyan'
				key.should.be.equal 'reporter'
				currentMap.should.be.equal map

		it "should use context as this context" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]
			context = {}

			map.forEach do
				!-> @should.be.equal context
				context


	describe ".keys()" (...) !->
		it "should return all defined keys" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]
			keys = map.keys!

			keys[0].should.be.equal 'reporter'
			keys[1].should.be.equal 'timeout'

	describe ".values()" (...) !->
		it "should return all defined values" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]
			values = map.values!

			values[0].should.be.equal 'nyan'
			values[1].should.be.equal 2000

	describe ".entries()" (...) !->
		it "should return all entries" !->
			map = new Map [<[reporter nyan]> ['timeout' 2000]]
			entries = map.entries!

			entries[0][0].should.be.equal 'reporter'
			entries[0][1].should.be.equal 'nyan'

			entries[1][0].should.be.equal 'timeout'
			entries[1][1].should.be.equal 2000
