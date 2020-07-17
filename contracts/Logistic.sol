pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

import "./roles/MakerRole.sol";
import "./roles/MerchantRole.sol";
import "./roles/OwnerRole.sol";


contract Logistic is ERC721Full, OwnerRole, MerchantRole, MakerRole {
    mapping (uint256 => address) private _pendingDeliveries;
    bool private restrictedMode;

    modifier makerOrMerchant() {
        require(_isMakerOrMerchant(msg.sender),
            "Logistic: caller does not have the Maker role nor the Merchant role");
        _;
    }

    modifier whenNotRestrictedMode() {
        require(restrictedMode == false,
            "Logistic: restricted mode activated"
        );
        _;
    }

    constructor() public ERC721Full("Logistic", "LM") {
        restrictedMode = true;
        renounceMerchant();
        renounceMaker();
    }

    function pendingDeliveries(uint256 tokenId) external view returns (address) {
        return _pendingDeliveries[tokenId];
    }

    function approve(address to, uint256 tokenId) public whenNotRestrictedMode {
        super.approve(to, tokenId);
    }

    function setApprovalForAll(address to, bool approved) public {
        revert("Logistic: cannot approve for all");
    }

    function addMaker(address account) public onlyOwner {
        require(!isMerchant(account), "Account is merchant");
        _addMaker(account);
    }

    function addMerchant(address account) public onlyOwner {
        require(!isMaker(account), "Account is maker");
        _addMerchant(account);
    }

    function newItem(uint256 tokenId) public onlyMaker {
        _mint(msg.sender, tokenId);
    }

    function send(address receiver, uint256 tokenId) public makerOrMerchant {
        require(_pendingDeliveries[tokenId] == address(0),
            "Logistic: Can't send an item in pending delivery");
        require(isMerchant(receiver), "Logistic: receiver is not a merchant");
        // assert(ownerOf(tokenId) == msg.sender);
        restrictedMode = false;
        approve(receiver, tokenId);
        restrictedMode = true;
        _pendingDeliveries[tokenId] = receiver;
    }

    function receive(address sender, uint256 tokenId) public onlyMerchant {
        require(_pendingDeliveries[tokenId] == msg.sender,
            "Logistic: Can't receive an item not delivered");
        // require(_isMakerOrMerchant(sender),
        //     "Logistic: sender is not merchant nor maker");
        restrictedMode = false;
        transferFrom(sender, msg.sender, tokenId);
        restrictedMode = true;
        _pendingDeliveries[tokenId] = address(0);
    }

    function sendToBuyer(uint256 tokenId) public makerOrMerchant {
        require(_pendingDeliveries[tokenId] == address(0),
            "Logistic: Can't send to buyer an item in pending delivery");
        _burn(msg.sender, tokenId);
    }

    function _transferFrom(address from, address to, uint256 tokenId) internal
    whenNotRestrictedMode {
        super._transferFrom(from, to, tokenId);
    }

    function _isMakerOrMerchant(address account) private view returns (bool) {
        return isMaker(account) || isMerchant(account);
    }
}