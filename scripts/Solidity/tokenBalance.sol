// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalance {
    function batchBalanceCheck(address _tokenAddress, address[] memory accounts) external view returns (uint256[] memory tokenBalances) {
        tokenBalances = new uint256[](accounts.length);
        for (uint i = 0; i < accounts.length; i++) {
            tokenBalances[i] = IERC20(_tokenAddress).balanceOf(accounts[i]);
        }
    }

    function batchBalanceCheckWithTokenList(address[] memory _tokenAddress, address[] memory accounts) external view returns (uint256[] memory tokenBalances) {
        require(accounts.length == _tokenAddress.length, "Array Length must be equal");
        tokenBalances = new uint256[](accounts.length);
        for (uint i = 0; i < accounts.length; i++) {
            tokenBalances[i] = IERC20(_tokenAddress[i]).balanceOf(accounts[i]);
        }
    }

    function batchTokenWithSingleAccount(address[] memory _tokenAddress, address accounts) external view returns (uint256[] memory tokenBalances) {
        tokenBalances = new uint256[](_tokenAddress.length);
        for (uint i = 0; i < _tokenAddress.length; i++) {
            tokenBalances[i] = IERC20(_tokenAddress[i]).balanceOf(accounts);
        }
    }
}