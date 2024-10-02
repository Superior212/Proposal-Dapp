import { useCallback } from "react";
import useContract from "./useContract";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";
import { parseEther } from "ethers";
import { useToast } from "./use-toast";


/**
 * Custom React hook for creating proposals on an Ethereum smart contract
 * Handles wallet connection, network validation, and transaction execution
 */
const useCreateProposal = () => {
    // Initialize toast functionality
    const { toast } = useToast();

    // Get contract instance (with signer)
    const contract = useContract(true);

    // Get user's wallet address
    const { address } = useAppKitAccount();

    // Get current network chainId
    const { chainId } = useAppKitNetwork();

    // Return memoized function to create a proposal
    return useCallback(
        async (description, recipient, amount, duration, minVote) => {
            // Step 1: Input validation
            if (!description || !recipient || !amount || !duration || !minVote) {
                toast({
                    title: "Missing Information",
                    description: "Please fill in all fields.",
                    variant: "destructive",
                });
                return;
            }

            // Step 2: Wallet connection check
            if (!address) {
                toast({
                    title: "Wallet Not Connected",
                    description: "Please connect your wallet to continue.",
                    variant: "destructive",
                });
                return;
            }

            // Step 3: Network validation
            if (Number(chainId) !== liskSepoliaNetwork.chainId) {
                toast({
                    title: "Wrong Network",
                    description: "Please connect to the correct network.",
                    variant: "destructive",
                });
                return;
            }

            // Step 4: Contract availability check
            if (!contract) {
                toast({
                    title: "Contract Unavailable",
                    description: "Unable to interact with the smart contract.",
                });
                return;
            }

            try {
                // Step 5: Estimate gas for the transaction
                const estimatedGas = await contract.createProposal.estimateGas(
                    description,
                    recipient,
                    parseEther(amount),  // Convert amount to Wei
                    duration,
                    minVote
                );

                // Step 6: Execute the transaction with 20% more gas than estimated
                const tx = await contract.createProposal(
                    description,
                    recipient,
                    parseEther(amount),
                    duration,
                    minVote,
                    {
                        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
                    }
                );

                // Step 7: Notify user that transaction is submitted
                toast({
                    title: "Transaction Submitted",
                    description: "Your proposal creation transaction is being processed.",
                });

                // Step 8: Wait for transaction to be mined
                const receipt = await tx.wait();

                // Step 9: Check transaction status and notify user
                if (receipt.status === 1) {
                    toast({
                        title: "Proposal Created",
                        description: "Your proposal has been successfully created.",
                    });
                } else {
                    toast({
                        title: "Proposal Creation Failed",
                        description: "Your proposal creation transaction failed.",
                    });
                }
            } catch (error) {
                // Step 10: Handle any errors that occur during the process
                console.error("Error while creating proposal: ", error);
                toast({
                    title: "Error",
                    description: "An error occurred while creating the proposal.",
                });
            }
        },
        [address, chainId, contract, toast]  // Dependencies for useCallback
    );
};

export default useCreateProposal;