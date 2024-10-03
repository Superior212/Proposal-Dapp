import { useCallback, useEffect, useState } from "react";
import { CreateProposal } from "./components/CreateProposal";
import Layout from "./components/Layout";
import ProposalsCard from "./components/Proposals";
import useContract from "./hooks/useContract";
import { Contract, Interface } from "ethers";
import useRunners from "./hooks/useRunners";
import ABI from "./ABI/proposal.json";
import useFetchProposals from "./hooks/useFetchProposals";

// const multicallAbi = [
//   "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
// ];

const App = () => {
  const { proposals, isFetchingProposals } = useFetchProposals();
  // const readOnlyProposalContract = useContract(true);
  // const { readOnlyProvider } = useRunners();
  // const [proposals, setProposals] = useState([]);

  // const fetchProposals = useCallback(async () => {
  //   if (!readOnlyProposalContract) return;

  //   const multicallContract = new Contract(
  //     import.meta.env.VITE_MULTI_CALL_ADDRESS,
  //     multicallAbi,
  //     readOnlyProvider
  //   );

  //   const itf = new Interface(ABI);

  //   try {
  //     const proposalCount = Number(
  //       await readOnlyProposalContract.proposalCount()
  //     );

  //     const proposalsIds = Array.from(
  //       { length: proposalCount - 1 },
  //       (_, i) => i + 1
  //     );

  //     const calls = proposalsIds.map((id) => ({
  //       target: import.meta.env.VITE_CONTRACT_ADDRESS,
  //       callData: itf.encodeFunctionData("proposals", [id]),
  //     }));

  //     const responses = await multicallContract.tryAggregate.staticCall(
  //       true,
  //       calls
  //     );

  //     const decodedResults = responses.map((res) =>
  //       itf.decodeFunctionResult("proposals", res.returnData)
  //     );

  //     const data = decodedResults.map((proposalStruct) => ({
  //       description: proposalStruct.description,
  //       amount: proposalStruct.amount,
  //       minRequiredVote: proposalStruct.minVotesToPass,
  //       voteCount: proposalStruct.voteCount,
  //       deadline: proposalStruct.votingDeadline,
  //       executed: proposalStruct.executed,
  //     }));

  //     setProposals(data);
  //   } catch (error) {
  //     console.log("error fetching proposals: ", error);
  //   }
  // }, [readOnlyProposalContract, readOnlyProvider]);

  // useEffect(() => {
  //   fetchProposals();
  // }, [fetchProposals]);

  return (
    <Layout>
      <CreateProposal />
      <ProposalsCard
        proposals={proposals}
        isFetchingProposals={isFetchingProposals}
      />
    </Layout>
  );
};

export default App;
