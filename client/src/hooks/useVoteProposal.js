import { useCallback } from "react";

import { useState } from "react";
import useContract from "./useContract";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";

import { liskSepoliaNetwork } from "../connection";
import { useToast } from "./use-toast";

const useVoteProposals = () => {
    const { toast } = useToast();
    const contract = useContract(true);
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    const [isVoting, setIsVoting] = useState(false);

    return {
        vote: useCallback(
            async (proposalId) => {
                if (!proposalId) {
                    toast({
                        title: "Missing Information",
                        description: "Missing proposal Id Field!",
                        variant: "destructive",
                    });
                    return;
                }

                setIsVoting(true);
                if (!address) {
                    toast({
                        title: "Wallet connect ",
                        description: "Connect your wallet!",
                        variant: "destructive",
                    });
                    setIsVoting(false);
                    return;
                }
                if (Number(chainId) !== liskSepoliaNetwork.chainId) {
                    toast({
                        title: "Wallet connect ",
                        description: "You are not connected to the right network, Please connect to liskSepolia",
                        variant: "destructive",
                    });
                    setIsVoting(false);
                    return;
                }

                if (!contract) {
                    toast({
                        title: "Wallet connect ",
                        description: "Cannot get contract!",
                        variant: "destructive",
                    });
                    setIsVoting(false);
                    return;
                }

                try {
                    const estimatedGas = await contract.vote.estimateGas(proposalId);

                    const tx = await contract.vote(proposalId, {
                        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
                    });

                    const reciept = await tx.wait();

                    if (reciept.status === 1) {
                        toast({
                            title: "Wallet connect ",
                            description: "Proposal vote successful",
                            variant: "destructive",
                        });
                        setIsVoting(false);
                        return;
                    }
                    toast({
                        title: "Wallet connect ",
                        description: "Proposal vote failed",
                        variant: "destructive",
                    });
                    setIsVoting(false);
                    return;
                } catch (error) {
                    console.error("error while creating proposal: ", error);
                    setIsVoting(false);
                    if (error.action === 'estimateGas' && error.code === 'CALL_EXCEPTION') return toast({
                        title: "Wallet connect ", description: "You can't vote for a proposal twice", variant: "destructive",
                    })
                    toast({
                        title: "Wallet connect ",
                        description: "Proposal vote errored",
                        variant: "destructive",
                    });
                }
                return;
            },
            [address, chainId, contract]
        ),
        isVoting,
    };
};

export default useVoteProposals;