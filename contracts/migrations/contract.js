var Vote = artifacts.require("./MyContract.sol");

export default function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Vote);
};