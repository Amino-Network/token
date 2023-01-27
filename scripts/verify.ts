import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import ownerConfig from "./config/config";

task("verify-amino", "Verifies AMO Token Contract")
.addParam("address", "the token address")
    .setAction(
        async (args, hre) => {
            await hre.run("verify:verify", {
                address: args.address,
                // constructorArguments: tokenConf,
                contract: "contracts/Amino.sol:Amino",
                constructorArguments: ["Amino", "AMO",]
            });
        }
    );

//used below in etherscan to generate file that Verifies. Enable optimization during verification 
//npx hardhat flat contracts/Amino.sol > contracts/amino_flat2.sol
    task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
  .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(/pragma experimental ABIEncoderV2;\n/gm, ((i) => (m) => (!i++ ? m : ""))(0));
    console.log(flattened);
  });
