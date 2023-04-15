// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TokenA is Context, ERC20, Ownable{

    string private _name = 'TokenA';
    string private _symbol = 'TokenA';

    constructor () ERC20 (_name, _symbol) {
        _mint(_msgSender(), 100_000_000 ether);
    }
}
