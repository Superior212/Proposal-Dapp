/**
 * This file sets up an Ethereum JSON-RPC provider using ethers.js
 * 
 * A provider is the primary way to interact with the Ethereum blockchain.
 * It allows reading blockchain data and sending transactions.
 */

// Import JsonRpcProvider from ethers.js library
// JsonRpcProvider is used to connect to Ethereum nodes via JSON-RPC protocol
import { JsonRpcProvider } from "ethers";

// Create and export a new provider instance
// This provider can be imported and used in other files
export const jsonRpcProvider = new JsonRpcProvider(
    // Use an environment variable for the RPC URL
    // VITE_LISK_SEPOLIA_RPC_URL should be defined in your .env file
    // Example URL: https://sepolia.infura.io/v3/your-project-id
    // The URL connects to the Sepolia testnet, not the Ethereum mainnet
    import.meta.env.VITE_LISK_SEPOLIA_RPC_URL
);

/* Usage examples:

1. Reading the current block number:
   const blockNumber = await jsonRpcProvider.getBlockNumber();

2. Getting an account balance:
   const balance = await jsonRpcProvider.getBalance("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");

3. Fetching transaction details:
   const tx = await jsonRpcProvider.getTransaction("0x123..."); // transaction hash

4. Getting the network information:
   const network = await jsonRpcProvider.getNetwork();
*/

// Note: This provider is read-only by default. To send transactions,
// you'll need to add a signer:
// const signer = await jsonRpcProvider.getSigner();