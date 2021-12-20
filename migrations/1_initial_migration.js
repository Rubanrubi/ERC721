const Panda = artifacts.require("Panda");

module.exports = function (deployer) {
  deployer.deploy(Panda);
};
