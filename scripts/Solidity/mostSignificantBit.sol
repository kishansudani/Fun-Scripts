// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract MostSignificantBit {
    function mostSignificantBit(uint number) external pure returns (uint8 result) {
       if (number >= 2 ** 128) {
            number >>= 128;
            result += 128;
        }

        if (number >= 2 ** 64) {
            number >>= 64;
            result += 64;
        }

        if (number >= 2 ** 32) {
            number >>= 32;
            result += 32;
        }

        if (number >= 2 ** 16) {
            number >>= 16;
            result += 16;
        }

        if (number >= 2 ** 8) {
            number >>= 8;
            result += 8;
        }

        if (number >= 2 ** 4) {
            number >>= 4;
            result += 4;
        }

        if (number >= 2 ** 2) {
            number >>= 2;
            result += 2;
        }

        if (number >= 2) result += 1;
    }

}