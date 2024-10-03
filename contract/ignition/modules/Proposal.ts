// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProposalModule = buildModule("ProposalModule", (m) => {
  const Proposal = m.contract("ProposalContract");

  return { Proposal };
});

export default ProposalModule;
