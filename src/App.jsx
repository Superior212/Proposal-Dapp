import { useCallback, useEffect, useState } from "react";
import { CreateProposal } from "./components/CreateProposal";
import Layout from "./components/Layout";
import ProposalsCard from "./components/Proposals";
import useContract from "./hooks/useContract";

const App = () => {
  const readOnlyProposalContract = useContract(true);
  const [proposals, setProposals] = useState([]);

  const fetchProposals = useCallback(async () => {
    if (!readOnlyProposalContract) return;
    console.log("proivder: ", readOnlyProposalContract.runner);

    try {
      const proposalCount = Number(
        await readOnlyProposalContract.proposalCount()
      );

      const proposalsId = Array.from(
        { length: proposalCount },
        (_, i) => i + 1
      );

      proposalsId.pop();

      console.log("proposalsId: ", proposalsId);

      proposalsId.forEach(async (proposalId) => {
        const proposalStruct = await readOnlyProposalContract.proposals(
          proposalId
        );

        setProposals((prev) => [
          ...prev,
          {
            description: proposalStruct.description,
            amount: proposalStruct.amount,
            minRequiredVote: proposalStruct.minVotesToPass,
            votecount: proposalStruct.voteCount,
            deadline: proposalStruct.votingDeadline,
            executed: proposalStruct.executed,
          },
        ]);
      });
    } catch (error) {
      console.log("error fetching proposals: ", error);
    }
  }, [readOnlyProposalContract]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);
  return (
    <Layout>
      <CreateProposal />
      <ProposalsCard proposals={proposals} />
    </Layout>
  );
};

export default App;
