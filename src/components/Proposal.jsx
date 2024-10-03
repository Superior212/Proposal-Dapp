import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatEther } from "ethers";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import useVoteProposals from "../hooks/useVoteProposal";

const Proposal = ({
  id,
  description = "",
  amount = "0",
  minRequiredVote = "0",
  voteCount = "0",
  deadline = "0",
  executed = false,
}) => {
  const { vote, isVoting } = useVoteProposals();
  //   const [isVoting, setIsVoting] = useState(false);

  // Safely convert values to numbers with fallbacks
  const safeVoteCount = Number(voteCount) || 0;
  const safeMinRequiredVote = Number(minRequiredVote) || 1; // Prevent division by zero
  const safeDeadline = Number(deadline) || 0;

  const isExpired = new Date(safeDeadline * 1000) < new Date();
  const progressPercentage = Math.min(
    (safeVoteCount / safeMinRequiredVote) * 100,
    100
  );

  //   const handleVote = async () => {
  //     try {
  //       setIsVoting(true);
  //       await onVote?.();
  //     } catch (error) {
  //       console.error("Voting failed:", error);
  //     } finally {
  //       setIsVoting(false);
  //     }
  //   };

  return (
    <Card className="sm:w-full sm:max-w-xl">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Proposal</CardTitle>
          <Badge
            variant={
              executed ? "success" : isExpired ? "destructive" : "secondary"
            }>
            {executed ? "Executed" : isExpired ? "Expired" : "Active"}
          </Badge>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-2 h-4 w-4" />
              Amount
            </div>
            <div className="font-medium">
              {formatEther(amount.toString())} ETH
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Deadline
            </div>
            <div className="font-medium">
              {new Date(safeDeadline * 1000).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Votes: {safeVoteCount} / {safeMinRequiredVote}
            </div>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            {executed ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : isExpired ? (
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
            ) : (
              <Clock className="mr-2 h-4 w-4" />
            )}
            {executed
              ? "Executed"
              : isExpired
              ? "Voting Closed"
              : "Voting Open"}
          </div>
          <Button
            onClick={() => vote(id)}
            disabled={executed || isExpired || isVoting}>
            {isVoting ? "Voting..." : "Vote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Proposal;
