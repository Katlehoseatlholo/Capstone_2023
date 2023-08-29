var PiggyBank = artifacts.require("./PiggyBank.sol");

export default function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(PiggyBank);
};