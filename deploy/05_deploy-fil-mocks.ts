import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction, DeployedContract } from "hardhat-deploy/types"
//import { network, ethers } from "hardhat"
import callRpc from "../utils/call-rpc"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { network } from "hardhat"

const fa = require("@glif/filecoin-address")
//const util = require("util")
//const request = util.promisify(require("request"))

//function hexToBytes(hex: any) {
//    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))
//    return new Uint8Array(bytes)
//}

const deployFilMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    const f4Address = fa.newDelegatedEthAddress(deployer).toString()
    const nonce = await callRpc("Filecoin.MpoolGetNonce", [f4Address])

    console.log("Wallet Ethereum Address:", deployer)
    console.log("Wallet f4Address: ", f4Address)

    await deploy("MinerAPI", {
        from: deployer,
        args: [0x0000001],
        // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
        // a large gasLimit. This should be addressed in the following releases.
        gasLimit: 1000000000, // BlockGasLimit / 10
        // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })

    await deploy("MarketAPI", {
        from: deployer,
        args: [],
        // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
        // a large gasLimit. This should be addressed in the following releases.
        gasLimit: 1000000000, // BlockGasLimit / 10
        // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
}

export default deployFilMocks

deployFilMocks.tags = ["MinerAPI", "MarketAPI"]
