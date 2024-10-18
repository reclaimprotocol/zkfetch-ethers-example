# zkFetch Proof Verification Example

This project demonstrates how to generate a proof using Reclaim's zkFetch and verify it on-chain using ethers.js. It fetches the Ethereum price from the CoinGecko API, generates a proof for the fetched data, and then verifies the proof on a smart contract deployed on the blockchain.

## Prerequisites

- Node.js and npm installed
- Access to a blockchain RPC URL (e.g., Base Sepolia network)
- A Reclaim app ID and app secret from [Reclaim Dashboard](https://dev.reclaimprotocol.org/dashboard)
- Address of a deployed Reclaim contract you can find how to [deploy your own](https://docs.reclaimprotocol.org/solidity/quickstart) or use our already [deployed contract](https://docs.reclaimprotocol.org/solidity/supported-networks) from our [Documentaion](https://docs.reclaimprotocol.org/solidity/supported-networks)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://gitlab.reclaimprotocol.org/starterpacks/zkfetch-ethers-example.git
   cd zkfetch-ethers-example
    ```
2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Create a `.env` File**:

    Create a .env file in the root directory and populate it with the content mentioned in the `.env.example`
    Make sure to replace the placeholders with your actual values.

4. **Running the Script**
To execute the proof verification script, run:
    ```bash
    node index.js
    ```

    The script will:

    - Fetch the Ethereum price from the CoinGecko API (As an Example).
    - Generate a proof for the fetched data.
    - Verify the proof on-chain using the provided contract address.

## Project Structure
- `index.js`: The main script for generating and verifying proofs.
- `contractABI.json`: The ABI for the smart contract with the verifyProof function.
- `.env`: Environment variables for configuring the script (You need to create it with the help of `.env.example`).


## Notes

- Make sure your wallet has enough funds to pay for gas fees on the specified network.
- The script uses the Base Sepolia test network by default. You can change the `RPC_URL` and `CONTRACT_ADDRESS` to point to your preferred network and contract.