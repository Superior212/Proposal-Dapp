import { CreateProposal } from "./components/CreateProposal";
import Layout from "./components/Layout";
import ProposalsCard from "./components/Proposals";
// import useFetchProposals from "./hooks/useFetchProposals";
import useFetchProposals2 from "./hooks/useFetchProposals2";

const App = () => {
  const { proposals, isFetchingProposals } = useFetchProposals2();

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
