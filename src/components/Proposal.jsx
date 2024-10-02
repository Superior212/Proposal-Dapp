import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatEther } from "ethers";
const Proposal = ({
  description,
  amount,
  minRequiredVote,
  voteCount,
  deadline,
  executed,
}) => {
  return (
    <div className="container mx-auto w-full">
      <Card className="w-full  max-w-xl h-[80vh] sm:max-w-[25rem]">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-2xl font-bold">Proposals</CardTitle>
          <CardDescription>Details of the new proposal.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Description</div>
              <div className="text-muted-foreground text-lg">{description}</div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Amount</div>
              <div className="text-muted-foreground line-clamp-6 text-xs">
                {formatEther(amount)} ETH
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Required Vote:</div>
              <div className="text-muted-foreground text-lg">
                {Number(minRequiredVote)}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Vote Count:</div>
              <div className="text-muted-foreground text-lg">
                {Number(voteCount)}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Deadline:</div>
            <div className="text-muted-foreground text-lg">
              {" "}
              {new Date(Number(deadline) * 1000).toLocaleDateString()}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Vote Count</div>
            <div className="text-muted-foreground text-lg">{voteCount}</div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Executed:</div>
            <div className="text-muted-foreground text-lg">
              {String(executed)}
            </div>
          </div>

          <Button>Vote</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Proposal;
