import Proposal from "./Proposal";

function ProposalsCard ) {
  return (
    <>
      {proposals.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <div className="container mx-auto my-4">
          <div className="grid  grid-cols-1 sm:grid-cols-3 gap-3">
            {proposals.map(
              ({
                id,
                deadline,
                minRequiredVote,
                amount,
                description,
                executed,
                voteCount,
              }) => (
                <Proposal
                  key={`${deadline}${minRequiredVote}`}
                  id={id}
                  amount={amount}
                  deadline={deadline}
                  description={description}
                  executed={executed}
                  minRequiredVote={minRequiredVote}
                  voteCount={voteCount}
                  onClose={() => setIsModalOpen(false)}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProposalsCard;
