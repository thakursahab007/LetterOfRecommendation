import pkg from "hardhat";
const {ethers} = pkg;

async function main(){

    const lorContractFactory = await ethers.getContractFactory("LOR");
    console.log("Deploying lor contract");
    const lorContract = await lorContractFactory.deploy();
    await lorContract.waitForDeployment();

    console.log(`Contract deployed at :- ${lorContract.target}`);

}

main()
    .then(()=> process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exitCode = 1;
    })