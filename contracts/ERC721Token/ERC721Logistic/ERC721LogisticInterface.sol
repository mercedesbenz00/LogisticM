pragma solidity ^0.5.0;

import "../ERC721Base/ERC721BaseInterface.sol";
import "../ERC721Base/ERC721BaseEvents.sol";


/**
 * @title ERC721LogisticInterface
 * @dev Define the interface of the ERC721Logistic logic contract.
 */
contract ERC721LogisticInterface is ERC721BaseInterface {
    function getCounter() public view returns (uint256);
    function initializeERC721() public;
    function mint(address to) public;
}
