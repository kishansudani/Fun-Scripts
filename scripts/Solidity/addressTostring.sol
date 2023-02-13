pragma solidity ^0.8.0;

contract convertToString {
    function addressToString(address arg) pure public returns(string memory) {
        bytes memory addressBytes = abi.encodePacked(arg);
        bytes memory stringBytes = new bytes(42);
        stringBytes[0] = '0';
        stringBytes[1] = 'x';

        for(uint i = 0; i < 20; i++) {
            uint8 leftValue = uint8(addressBytes[i]) / 16;
            uint8 rightValue = uint8(addressBytes[i]) - 16 * leftValue;

            bytes1 leftChar = leftValue < 10 ? bytes1(leftValue + 48) : bytes1(leftValue + 87);
            bytes1 rightChar = rightValue < 10 ? bytes1(rightValue + 48) : bytes1(rightValue + 87);

            stringBytes[2 * i + 3] = rightChar;
            stringBytes[2 * i + 2] = leftChar;
        }
        return string(stringBytes);
    }
}