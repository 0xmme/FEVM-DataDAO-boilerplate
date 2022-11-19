import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
//import verify from "../helper-functions"
import { networkConfig /*, developmentChains*/ } from "../helper-hardhat-config"
import { ethers } from "hardhat"
import callRpc from "../utils/call-rpc"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    log("----------------------------------------------------")
    log("Deploying GovernanceToken and waiting for confirmations...")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
        // a large gasLimit. This should be addressed in the following releases.
        //gasLimit: 1000000000, // BlockGasLimit / 10
        // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        //maxPriorityFeePerGas: priorityFee,
        log: true,
        // we need to wait if on a live network so we can verify properly
        //waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`GovernanceToken at ${governanceToken.address}`)
    //if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //    await verify(governanceToken.address, [])
    //}
    log(`Delegating to ${deployer}`)
    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const transactionResponse = await governanceToken.delegate(delegatedAccount)
    await transactionResponse.wait(1)
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

export default deployGovernanceToken
deployGovernanceToken.tags = ["all", "governor"]
