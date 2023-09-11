var Vote = artifacts.require("./Contract.sol");

export default function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Vote);
};