pragma solidity ^0.8.0;

contract isContract {

    function isAddrContract(address addr) private view returns(bool) {
        uint codeLength;
        assembly {
            codeLength := extcodesize(addr)
        }
        return codeLength == 0 ? false : true;
    }

    function checkAddress(address addr) public view returns(bool) {
        return isAddrContract(addr);
    }
}