import { CreateProposal } from "./components/CreateProposal";
import Layout from "./components/Layout";
import ProposalsCard from "./components/Proposals";
import useFetchProposals from "./hooks/useFetchProposals";

const App = () => {
  const { proposals, isFetchingProposals } = useFetchProposals();

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
