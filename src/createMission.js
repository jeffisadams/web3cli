const solc = require('solc');
const fs = require('fs');

module.exports = (async (web3, args) => {
  if (args.length < 3) {
    console.log('Usage:\t "nodeGeth deployMissionContract <host> <contract Address> <from account> <ipfs product hash>"');
    return;
  }
  const [ address, from, ipfsProductHash ] = args;
  const abi = JSON.parse(fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_CreateMission.abi`, { encoding: 'utf-8' }));

  // // Instantiate the contract locally
  const contract = new web3.eth.Contract(abi, address);
  // Register with the contract event for a new contract address
  contract.events.MissionCreated({}, (error, result) => {
    if (!error) {
      console.log(result.returnValues.missionAddress)
    } else {
        console.log(error);
    }
  })

  await contract.methods.newMission(ipfsProductHash).send({
      value: web3.utils.toWei('2', "ether"),
      from: from,
      gas: 5000000
    })
});
