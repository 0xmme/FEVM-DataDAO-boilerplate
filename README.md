# dataDAO boilerplate hardhat kit


*This has been updated to work with Wallaby FEVM network*

<div id="top"></div>

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
    - [Important notice](#important-notice)
    - [Installation](#installation)
  - [Usage](#usage)
    - [On-Chain Governance Example](#on-chain-governance-example)
  - [Packages used](#packages-used)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgments](#acknowledgments)


<!-- ABOUT THE PROJECT

<!-- GETTING STARTED -->
# Getting Started 


It's recommended that you've gone through the [hardhat getting started documentation](https://hardhat.org/getting-started/) before proceeding here. 

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version`and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` And get an output like: `x.x.x`
    - You might need to install it with npm

### Important notice

This project uses v0.8 of the Zondax API Mocks. With more functions coming to the mock contracts, the contracts in this repo should be updated, too. See [Packages used](#packages-used) for more information.

### Installation

1. Clone this repo:
```
git clone https://github.com/mme022/datadao-boilerplate
cd datadao-boilerplate
```
2. Install dependencies
```sh
yarn
```

or 

```
npm i 
```

If you want to deploy to wallaby:
3. Add a `.env` file with the same contents of `.env.example`, but replaced with your variables.
![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)
> DO NOT PUSH YOUR PRIVATE_KEY TO GITHUB

4. Get the Deployer Address

Run this command:
```
yarn hardhat get-address
```

The f4address is the filecoin representation of your Ethereum address. This will be needed for the faucet in the next step.

The Ethereum address will be used otherwise.

5.Fund the Deployer Address

Go to the [Wallaby faucet](https://wallaby.network/#faucet), and paste in the f4 address we copied in the previous step. This will send some wallaby testnet FIL to the account.

6.Deploy the Governance Contracts and the Filecoin Mock APIs

Type in the following command in the terminal: 
 
 ```
yarn hardhat deploy --network wallaby
```

This will compile the contract and deploy it to the Wallaby network automatically!

Keep note of the deployed contract address for the next step.

If you just want to deploy the DAO structure, see the tags inside the deploy scripts.


<!-- USAGE EXAMPLES -->
## Usage
### On-Chain Governance Example

Here is the rundown of what the test suite does. 

1. We will deploy an ERC20 token that we will use to govern our DAO.
2. We will deploy a Timelock contract that we will use to give a buffer between executing proposals.
   1. Note: **The timelock is the contract that will handle all the money, ownerships, etc**
3. We will deploy our Governence contract 
   1. Note: **The Governance contract is in charge of proposals and such, but the Timelock executes!**
4. We will deploy a simple Box contract, which will be owned by our governance process! (aka, our timelock contract).
5. We will propose a new value to be added to our Box contract.
6. We will then vote on that proposal.
7. We will then queue the proposal to be executed.
8. Then, we will execute it!


Additionally, you can do it all manually on your own local network like so:

1. Setup local blockchain 
```
yarn hardhat node
```

2. Call a Market function defined in helper-hardhat-config.ts

In a second terminal (leave your blockchain running)
```
yarn hardhat run scripts/propose.ts --network localhost
```

3. Vote on that proposal

```
yarn hardhat run scripts/vote.ts --network localhost
```

4. Queue & Execute proposal!

```
yarn hardhat run scripts/queue-and-execute.ts --network localhost
```


You can also use the [Openzeppelin contract wizard](https://wizard.openzeppelin.com/#governor) to get other contracts to work with variations of this governance contract. 


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- PACKAGES USED -->
## Packages used

* [FEVM Hardhat Kit](https://github.com/filecoin-project/FEVM-Hardhat-Kit)
* [FEVM Solidity Mock API](https://github.com/Zondax/fevm-solidity-mock-api)
* [DAO Template](https://github.com/PatrickAlphaC/dao-template)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[@mme022](https://twitter.com/mme022)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [@HardhatHQ](https://twitter.com/HardhatHQ)
* [@Filecoin](https://twitter.com/Filecoin)
* [@_zondax\_](https://twitter.com/_zondax_)
* [@patrickalphac](https://twitter.com/patrickalphac)
* [Openzeppelin Governance Walkthrough](https://docs.openzeppelin.com/contracts/4.x/governance)
* [Openzeppelin Governance Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance)

<p align="right">(<a href="#top">back to top</a>)</p>

