// SPDX-License-Identifier: unlicensed

pragma solidity ^0.7.0;


contract SignatureUtility {

 
    //input a signature and determine the v, r and s values
    function splitSignature(bytes memory signature) 
        private 
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(signature.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(signature, 32))
            // second 32 bytes.
            s := mload(add(signature, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(signature, 96)))
        }

        return (v, r, s);
    }
    

    //input a message hash, v, r and s values and generate the public key
    function recoverPublicAddress (bytes32 messagehash, uint8 v, bytes32 r, bytes32 s) 
        private
        pure
        returns (address) 
    {
        return ecrecover(messagehash, v, r, s);
    }

    function fetchSigner(bytes memory signature, bytes32 messagehash)
        public
        pure
        returns (address sender) 
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
        return recoverPublicAddress(messagehash, v, r, s);
    }
}