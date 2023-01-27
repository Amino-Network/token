import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { Logger } from 'tslog'
import { ethers } from 'ethers'

const logger: Logger = new Logger()

//1000000000000000000000000000000 zeroes for 1 trillion in mint function called from etherscan
task('deploy-amino', 'Deploys Amino contract')
        .setAction(async (args, hre) => {
            const factory = await hre.ethers.getContractFactory(`contracts/Amino.sol:Amino`);
            const instance = await factory.deploy("Amino", "AMO");

            await instance.deployed();

            logger.info(instance.address);
        })
