const { ethers, upgrades } = require("hardhat");
const fs = require('fs');

async function main() {

 const token = await ethers.getContractFactory("MCT");
  console.log("Deploying MCT...");
  const tokenMCT = await upgrades.deployProxy(token, {
    initializer: "initialize",
    });

  await tokenMCT.deployed();
  const tokenaddr = tokenMCT.address;

  console.log("token deployed at :", tokenaddr);

  console.log("Deploying Logic contract...");
  const LogicSM = await ethers.getContractFactory("Logic");
  const logicdeployed = await upgrades.deployProxy(LogicSM, [tokenaddr], {
    initializer: "initialize",
    });

  await logicdeployed.deployed();
  console.log("login smart contract deployed to:", logicdeployed.address);
  

  let config = `
  export const logicAddr = "${logicdeployed.address}"
  export const tokenAddr ="${tokenaddr}"
  `


  let data = JSON.stringify(config)
  fs.writeFileSync('./contracts-config/config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });