const truffleAssert = require('truffle-assertions')
var Web3 = require('web3')

const { products, getHash, ZERO_ADDRESS } = require('./utils')

const uri = "http://localhost:8545"
var web3 = new Web3(uri)

const Registry = artifacts.require("Registry")
const LogisticInterface = artifacts.require("LogisticInterface")
const MockImplementationV0 = artifacts.require("MockImplementationV0")

contract("Proxy", async accounts => {
	const [owner, other] = accounts

	before(async function () {
		// Create proxy
		registry = await Registry.deployed()
		const { logs } = await registry.createProxy('0')
		const { proxy } = logs.find(l => l.event === 'ProxyCreated').args
		instance = await LogisticInterface.at(proxy)
		imp = await MockImplementationV0.new()
	});

	it("addFallback", async () => {
		let result = await registry.addFallback('v0', imp.address, { from: owner })
		truffleAssert.eventEmitted(result, 'FallbackAdded', ev =>
			ev.version === 'v0' &&
			ev.implementation === imp.address
		);
		await truffleAssert.reverts(
			registry.addFallback('v0', ZERO_ADDRESS, { from: owner }),
			"Registry: fallback already defined"
		)
	})

	it("addVersionFromName", async () => {
		let result = await registry.addVersionFromName(
			'v0', "myMethod()", imp.address, { from: owner })
		truffleAssert.eventEmitted(result, 'VersionAdded', ev =>
			ev.version === 'v0' &&
			ev.func === "0x70dce926" &&
			ev.implementation === imp.address
		);
		await truffleAssert.reverts(
			registry.addVersionFromName(
				'v0', "myMethod()", imp.address, { from: owner }),
			"Registry: func already defined"
		)
	})

	it("upgradeTo", async () => {
		await instance.upgradeTo('v1', { from: owner });
	})
})