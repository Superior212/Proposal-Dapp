/**
 * Custom React hook for creating Ethereum contract instances
 * This hook can create both read-only and signer-enabled contract instances
 */

import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import ABI from "../ABI/proposal.json";

/**
 * Creates an Ethereum contract instance
 * @param {boolean} withSigner - Whether to create a contract instance with a signer
 * @returns {Contract|null} Contract instance or null if signer is required but not available
 */
const useContract = (withSigner = false) => {
    // Get providers and signer from useRunners hook
    const { readOnlyProvider, signer } = useRunners();

    // Memoize the contract instance to prevent unnecessary recreations
    return useMemo(() => {
        // If signer is requested
        if (withSigner) {
            // Return null if signer isn't available
            if (!signer) return null;

            // Create and return a contract instance with signer
            return new Contract(
                import.meta.env.VITE_CONTRACT_ADDRESS, // Contract address
                ABI,                                    // Contract ABI
                signer                                  // Signer for transactions
            );
        }

        // Create and return a read-only contract instance
        return new Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,     // Contract address
            ABI,                                        // Contract ABI
            readOnlyProvider                            // Read-only provider
        );
    }, [readOnlyProvider, signer, withSigner]);        // Dependencies for useMemo
};

export default useContract;

/* Usage example:
function MyComponent() {
    // Read-only contract instance
    const readOnlyContract = useContract();
    
    // Signer-enabled contract instance
    const signerContract = useContract(true);

    async function readContractData() {
        // Use readOnlyContract for view functions
        const someValue = await readOnlyContract.someViewFunction();
    }

    async function writeToContract() {
        if (signerContract) {
            // Use signerContract for transactions
            await signerContract.someWriteFunction();
        }
    }
}
*/