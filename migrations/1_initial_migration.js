const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Panda = artifacts.require("KuttaPanda");
const RGUpgradable = artifacts.require("RGUpgradable");
const RGUpgradableV1 = artifacts.require("RGUpgradableV1");

module.exports = async function (deployer) {
  // await deployer.deploy(Panda);
  // await deployProxy(RGUpgradable, { deployer, kind: "uups" });
  // console.log(RGUpgradable.address);
  await upgradeProxy(RGUpgradable.address, RGUpgradableV1, { deployer, kind: "uups" });
};
