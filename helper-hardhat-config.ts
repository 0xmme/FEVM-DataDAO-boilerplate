export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    goerli: {
        blockConfirmations: 6,
    },
    wallaby: {
        blockConfirmations: 6,
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const FUNCMARKET = "get_balance"
export const VALFUNCMARKET = "770xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" // network localhost
//export const VALFUNCMARKET = "0xfE3DeFdb822B8035052792463c0212e0E2e62465" // public key for my test wallaby wallet
export const FUNCMARKET_DESCRIPTION = "Proposal #1 get label for deal with id 77"
