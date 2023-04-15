//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

interface IPancakeCallee {
    function pancakeCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
