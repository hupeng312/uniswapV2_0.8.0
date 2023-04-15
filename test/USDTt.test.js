const chai = require('chai')
const { ethers, isAddress} = require("ethers")
const { expectEvent, BN, time, ether } = require('@openzeppelin/test-helpers')
chai.use(require('chai-bn')(BN))
const { expect } = require("chai")
const assert = require('assert')


//准备合约
const WETHContract = artifacts.require("WETH")
const PancakeFactoryContract = artifacts.require("PancakeFactory")
const PancakePairContract = artifacts.require("PancakePair")
const PancakeRouterContract = artifacts.require("PancakeRouter")
const USDTtContract = artifacts.require("USDTt")
const TokenA2Contract = artifacts.require("TokenA")


contract("开始测试", (accounts) => {
    let WETH, pancakeFactory, pair, router, usdt, tokenA
    let owner, sender, receiver, coldWallet, team, financing, buyer, seller, addr1
    let web3Provider, timestamp

    beforeEach(async () => {
        [owner, sender, receiver, coldWallet, team, financing, buyer, seller, addr1] = accounts

        WETH = await WETHContract.new({from:owner})
        web3Provider = WETH.contract.currentProvider
        pancakeFactory = await PancakeFactoryContract.new(owner, {from: owner})
        router = await PancakeRouterContract.new(pancakeFactory.address, WETH.address, {from:owner})
        usdt = await USDTtContract.new({from:owner})
        tokenA = await TokenA2Contract.new({from:owner})

        timestamp = Math.round(new Date().getTime() / 1000);


        await usdt.approve(router.address, ethers.MaxUint256, {from: owner})
        await tokenA.approve(router.address, ethers.MaxUint256, {from: owner})

        // 添加u流动性
        await router.addLiquidity(
            usdt.address,
            tokenA.address,
            ether('100000'),
            ether('1000000'),
            0,
            0,
            owner,
            timestamp + 86400*100,
            {from: owner}
        )
    })


    it('tokenB 基础测试', async function () {

        console.log((await tokenA.balanceOf(receiver)).toString(), '买之前')

        let tx = await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            ether('100'),
            0,
            [usdt.address, tokenA.address],
            receiver,
            timestamp + 86400*10,
            {from: owner}
        )

        console.log(tx.tx)
        // 直接执行 truffle debug {交易hash}   即可进行单步debug调试

        console.log((await tokenA.balanceOf(receiver)).toString(), '买之后')

    })
})
