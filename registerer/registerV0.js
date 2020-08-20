const registerV0 = async (registry, [OwnerAddress,
AccessAddress,
ERC721LogisticAddress,
NameAddress,
PauseAddress,
ProductAddress]) => {
	console.log(OwnerAddress,
	AccessAddress,
	ERC721LogisticAddress,
	NameAddress,
	PauseAddress,
	ProductAddress);

	// Register V0 implementations
	await registry.addVersionFromName('0', 'transferOwnership(address)', OwnerAddress)
	await registry.addVersionFromName('0', 'initializeOwner(address)', OwnerAddress)
	await registry.addVersionFromName('0', 'getOwner()', OwnerAddress)

	await registry.addVersionFromName('0', 'addSupplier(address)', AccessAddress)
	await registry.addVersionFromName('0', 'removeSupplier(address)', AccessAddress)
	await registry.addVersionFromName('0', 'renounceSupplier()', AccessAddress)
	await registry.addVersionFromName('0', 'addDeliveryMan(address)', AccessAddress)
	await registry.addVersionFromName('0', 'removeDeliveryMan(address)', AccessAddress)
	await registry.addVersionFromName('0', 'renounceDeliveryMan()', AccessAddress)
	await registry.addVersionFromName('0', 'getRole(address)', AccessAddress)
	await registry.addVersionFromName('0', 'isSupplier(address)', AccessAddress)
	await registry.addVersionFromName('0', 'isDeliveryMan(address)', AccessAddress)

	await registry.addVersionFromName('0', 'initializeERC721()', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'mint(address)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'getCounter()', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'balanceOf(address)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'ownerOf(uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'safeTransferFrom(address,address,uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'transferFrom(address,address,uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'approve(address,uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'getApproved(uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'setApprovalForAll(address,bool)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'isApprovedForAll(address,address)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'safeTransferFrom(address,address,uint256,bytes)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'name()', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'symbol()', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'tokenURI(uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'totalSupply()', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'tokenOfOwnerByIndex(address,uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'tokenByIndex(uint256)', ERC721LogisticAddress)
	await registry.addVersionFromName('0', 'supportsInterface(bytes4)', ERC721LogisticAddress)

	await registry.addVersionFromName('0', 'setName(address,bytes32)', NameAddress)
	await registry.addVersionFromName('0', 'getName(address)', NameAddress)
	await registry.addVersionFromName('0', 'getAddress(bytes32)', NameAddress)

	await registry.addVersionFromName('0', 'getPaused()', PauseAddress)
	await registry.addVersionFromName('0', 'pause()', PauseAddress)
	await registry.addVersionFromName('0', 'unpause()', PauseAddress)

	await registry.addVersionFromName('0', 'newProduct(bytes32,address,uint256,bytes32)', ProductAddress)
	await registry.addVersionFromName('0', 'setProductSent(bytes32,address,address)', ProductAddress)
	await registry.addVersionFromName('0', 'setProductReceived(bytes32,address,address)', ProductAddress)
	await registry.addVersionFromName('0', 'getProductInfo(bytes32)', ProductAddress)
	await registry.addVersionFromName('0', 'productsSentFrom(bytes32,address)', ProductAddress)
	await registry.addVersionFromName('0', 'productsReceivedFrom(bytes32,address)', ProductAddress)
	await registry.addVersionFromName('0', 'getHashFromTokenId(uint256)', ProductAddress)
	await registry.addVersionFromName('0', 'productExists(bytes32)', ProductAddress)

	// Create proxy
	await registry.createProxy('0')
    // const { logs } = await registry.createProxy('0')
	// const { proxy } = logs.find(l => l.event === 'ProxyCreated').args
	// return proxy
}

module.exports.registerV0 = registerV0