import { ethers, network } from "hardhat"
import {
    MIN_DELAY,
    FUNCMARKET,
    VALFUNCMARKET,
    FUNCMARKET_DESCRIPTION,
    developmentChains,
} from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"
import { moveTime } from "../utils/move-time"

export async function queueAndExecute() {
    const args = [VALFUNCMARKET]
    const functionToCall = FUNCMARKET
    const marketApi = await ethers.getContract("MarketAPI")
    const encodedFunctionCall = marketApi.interface.encodeFunctionData(functionToCall, args)
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(FUNCMARKET_DESCRIPTION))
    // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

    const governor = await ethers.getContract("GovernorContract")
    console.log("Queueing...")
    const queueTx = await governor.queue(
        [marketApi.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await queueTx.wait(1)

    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
    }

    console.log("Executing...")
    // this will fail on a testnet because you need to wait for the MIN_DELAY!
    const executeTx = await governor.execute(
        [marketApi.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await executeTx.wait(1)
    console.log(`tx receipt for ${functionToCall}`)
    console.log(executeTx)
}

queueAndExecute()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
