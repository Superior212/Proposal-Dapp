/**
 * Custom React hook for managing Ethereum providers and signers
 * This hook handles both connected wallet providers and read-only providers
 * for interacting with the Ethereum blockchain
 */

import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { jsonRpcProvider } from "../constant/provider";
// import { jsonRpcProvider } from "../constants/provider";

const useRunners = () => {
    // State to store the signer (represents an Ethereum account)
    const [signer, setSigner] = useState();

    // Get the wallet provider from AppKit for the eip155 chain standard
    // (eip155 is the standard for Ethereum chains)
    const { walletProvider } = useAppKitProvider("eip155");

    // Create a BrowserProvider instance when walletProvider changes
    // This provider is used for interacting with the connected wallet
    const provider = useMemo(
        () => (walletProvider ? new BrowserProvider(walletProvider) : null),
        [walletProvider]
    );

    // Effect to update the signer when the provider changes
    useEffect(() => {
        if (!provider) return setSigner(null);
        provider.getSigner().then((newSigner) => {
            if (!signer) return setSigner(newSigner);
            if (newSigner.address === signer.address) return;
            setSigner(newSigner);
        });
    }, [provider, signer]);

    // Return both the wallet provider/signer and a read-only provider
    return {
        provider,        // Connected wallet provider (BrowserProvider)
        signer,          // Signer from the connected wallet
        readOnlyProvider: jsonRpcProvider  // Read-only provider for querying blockchain
    };
};

export default useRunners;

/* Usage example:
function MyComponent() {
    const { provider, signer, readOnlyProvider } = useRunners();

    useEffect(() => {
        if (signer) {
            // Can now use signer for transactions
            console.log("Wallet connected!");
        }
    }, [signer]);

    async function readBlockchain() {
        // Use readOnlyProvider for queries
        const blockNumber = await readOnlyProvider.getBlockNumber();
    }

    return <div>{signer ? "Wallet Connected" : "Please connect wallet"}</div>;
}
*/