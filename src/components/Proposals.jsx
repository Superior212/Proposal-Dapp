import Proposal from "./Proposal";

function ProposalsCard({ proposals }) {
  return (
    <>
      {proposals.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <div className="container mx-auto my-4">
          <div className="grid grid-cols-3 gap-3">
            {proposals.map(
              ({
                deadline,
                minRequiredVote,
                amount,
                description,
                executed,
                voteCount,
              }) => (
                <Proposal
                  key={`${deadline}${minRequiredVote}`}
                  amount={amount}
                  deadline={deadline}
                  description={description}
                  executed={executed}
                  minRequiredVote={minRequiredVote}
                  voteCount={voteCount}
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
