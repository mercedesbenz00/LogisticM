pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/Roles.sol";


contract DeliveryManRole {
    using Roles for Roles.Role;

    event DeliveryManAdded(address indexed account);
    event DeliveryManRemoved(address indexed account);

    Roles.Role private _deliveryMan;

    constructor () internal {
        _addDeliveryMan(msg.sender);
    }

    modifier onlyDeliveryMan() {
        require(isDeliveryMan(msg.sender),
            "DeliveryManRole: caller does not have the DeliveryMan role");
        _;
    }

    function isDeliveryMan(address account) public view returns (bool) {
        return _deliveryMan.has(account);
    }

    function renounceDeliveryMan() public {
        _removeDeliveryMan(msg.sender);
    }

    function _addDeliveryMan(address account) internal {
        _deliveryMan.add(account);
        emit DeliveryManAdded(account);
    }

    function _removeDeliveryMan(address account) internal {
        _deliveryMan.remove(account);
        emit DeliveryManRemoved(account);
    }
}