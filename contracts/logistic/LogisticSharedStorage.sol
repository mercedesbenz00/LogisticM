pragma solidity ^0.5.0;

import "../access/owner/OwnerStorage.sol";
import "../access/AccessStorage.sol";
import "../ERC721Token/ERC721Logistic/ERC721LogisticStorage.sol";
import "../name/NameStorage.sol";
import "../pause/PauseStorage.sol";
import "../product/ProductStorage.sol";


contract LogisticSharedStorage is
    OwnerStorage,
    AccessStorage,
    ERC721LogisticStorage,
    NameStorage,
    PauseStorage,
    ProductStorage {
    bool internal lock = true;
}