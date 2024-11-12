const { ReclaimClient } = require("@reclaimprotocol/zk-fetch");
const transformForOnchain = require("@reclaimprotocol/js-sdk");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const contractABI = require("./contractABI.json");

dotenv.config();

async function verifyProof() {
  // Initialize the ReclaimClient
  const reclaimClient = new ReclaimClient(
    process.env.APP_ID,
    process.env.APP_SECRET
  );

  try {
    // Example URL to fetch the data from
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

    // Generate the proof
    const proof = await reclaimClient.zkFetch(
      url,
      { method: "GET" },
      {
        responseMatches: [
          {
            type: "regex",
            value: '\\{"ethereum":\\{"usd":(?<price>[\\d\\.]+)\\}\\}',
          },
        ],
      }
    );

    if (!proof) {
      console.log("Failed to generate proof");
      return;
    }
    console.log("Generated Proof:", proof);

    // Verify the proof on-chain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const proofData = await transformForOnchain(proof);

    // Call the verifyProof function on the smart contract
    const tx = await contract.verifyProof(proofData);
    await tx.wait();
    console.log(
      "Proof verified on-chain successfully, Here is Transaction Hash:",
      tx.hash
    );
    process.exit(0);
  } catch (e) {
    console.error("Error verifying proof:", e.message);
    process.exit(1);
  }
}

// Run the verification function
verifyProof();
