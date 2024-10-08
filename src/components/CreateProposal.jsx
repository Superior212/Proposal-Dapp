import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useCreateProposal from "../hooks/useCreateProposal";

export function CreateProposal() {
  const handleCreateProposal = useCreateProposal();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    description: "",
    recipient: "",
    amount: "",
    duration: "",
    minVote: 2,
  });

  const handleInputChange = (name, e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const { amount, duration, description, minVote, recipient } = state;

  const handleSubmit = () => {
    handleCreateProposal(description, recipient, amount, duration, minVote);
    setIsOpen(false); // Close the dialog after submitting
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Proposal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Card className="w-full border-none shadow-none max-w-xl">
          <CardHeader>
            <DialogTitle>New Proposal</DialogTitle>
            <CardDescription>
              Submit a new proposal for your community.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your proposal..."
                rows={3}
                value={description}
                onChange={(e) => handleInputChange("description", e)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => handleInputChange("recipient", e)}
                  placeholder="Enter the recipient"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => handleInputChange("amount", e)}
                  type="number"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => handleInputChange("duration", e)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="votes">Minimum Required Votes</Label>
                <Input
                  id="votes"
                  type="number"
                  value={minVote}
                  onChange={(e) => handleInputChange("minVote", e)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} type="submit">
              Submit Proposal
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
