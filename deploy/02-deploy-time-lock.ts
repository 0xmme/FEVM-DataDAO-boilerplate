import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
//import verify from "../helper-functions"
import { networkConfig, /*developmentChains,*/ MIN_DELAY } from "../helper-hardhat-config"
import callRpc from "../utils/call-rpc"

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    log("----------------------------------------------------")
    log("Deploying TimeLock and waiting for confirmations...")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], [], deployer],
        log: true,
        // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
        // a large gasLimit. This should be addressed in the following releases.
        //gasLimit: 1000000000, // BlockGasLimit / 10
        // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        //maxPriorityFeePerGas: priorityFee,
        // we need to wait if on a live network so we can verify properly
        //waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`TimeLock at ${timeLock.address}`)
    //if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //    await verify(timeLock.address, [])
    //}
}

export default deployTimeLock
deployTimeLock.tags = ["all", "timelock"]
