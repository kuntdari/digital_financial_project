require("@nomiclabs/hardhat-ethers")
require( "@openzeppelin/hardhat-upgrades")
require( "@nomiclabs/hardhat-etherscan")


const fs = require('fs')
const privateKey = fs.readFileSync("secret").toString().trim() // || "another key" //  account private key in secret file
const projectId ="17abeb9c3c27fbef99ea5ad66619cf56bc677198450d4836734f4061a726f39b" // infura project id
const keylocal = "17abeb9c3c27fbef99ea5ad66619cf56bc677198450d4836734f4061a726f39b" // ganache

module.exports = {
  paths:{
    artifacts: './artifacts',
  },
  defaultNetwork: "hardhat",
  networks: {

    /*localhost: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [`${keylocal}`]
    },*/
    
    hardhat: {
      //url: "http://127.0.0.1:7545",
      chainId: 1337,
      //accounts: [`${keylocal}`]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`, 
      accounts: [privateKey]
     
    },
    eth: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
     
    }
  },
  etherscan: {
    apiKey: "17abeb9c3c27fbef99ea5ad66619cf56bc677198450d4836734f4061a726f39b", // eth scan api key
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}