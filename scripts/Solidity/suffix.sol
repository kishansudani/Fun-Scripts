// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Suffix  {
    function suffix(uint256 d) public pure returns (string memory) {
        if (d % 10 == 1) {
            return 'st';
        } else if (d % 10 == 2) {
            return 'nd';
        } else if (d % 10 == 3) {
            return 'rd';
        } else if (d % 10 == 0) {
            return 'th';
        } else {
            return 'th';
        }
    }
}