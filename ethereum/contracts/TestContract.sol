pragma solidity ^0.8.6;

contract TestContract {
    string public data;
    address public deployer;

    constructor(string memory _data) {
        data = _data;
        deployer = msg.sender;
    }
}