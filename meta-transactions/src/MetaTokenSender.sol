// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "forge-std/console.sol";



contract RandomToken is ERC20 {
    constructor() ERC20("", "") {}

    function freeMint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}

 contract TokenSender {
    using ECDSA for bytes32;

    // New mapping
    mapping(bytes32 => bool) executed;
    
    // Add the nonce parameter here
    function transfer(
        address sender,
        uint256 amount,
        address recipient,
        address tokenContract,
        uint nonce,
        bytes memory signature
    ) public {
        // pass the nonce ahead
        bytes32 messageHash = getHash(sender, amount, recipient, tokenContract, nonce);
        // Convert it to a signed message hash
        bytes32 signedMessageHash = MessageHashUtils.toEthSignedMessageHash(messageHash);

        require(!executed[signedMessageHash], "Already executed!");
       
        address signer = signedMessageHash.recover(signature);
        require(signer == sender, "Signature does not come from sender");
        
        // Mark this signature as having been executed now
        executed[signedMessageHash] = true;

        bool sent = ERC20(tokenContract).transferFrom(
            sender,
            recipient,
            amount
        );
        require(sent, "Transfer failed");
    }

    // add the nonce parameter here
    function getHash(
        address sender,
        uint256 amount,
        address recipient,
        address tokenContract ,
        uint nonce
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(sender, amount, recipient, tokenContract, nonce)
            );
    }
}