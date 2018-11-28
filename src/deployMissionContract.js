const fs = require('fs');

module.exports = (async (web3, args) => {
  if (args.length < 1) {
    console.log('Usage:\t "nodeGeth deployMissionContract <host> <from account> <product ipfs hash>"');
    return;
  }

  const [ from, productIpfsHash ] = args;

  // // Deploys the mission contract
  const missionAbi = JSON.parse(fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_Mission.abi`, { encoding: 'utf-8' }));
  const missionBin = fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_Mission.bin`, { encoding: 'utf-8' });

  const contractInstance = new web3.eth.Contract(missionAbi)

  const missionContractDeployed = await contractInstance.deploy({
    data: '0x' + missionBin,
    arguments: [ productIpfsHash ]
  }).send({
    value: web3.utils.toWei('5', 'ether'),
    from: from,
    gas: 5000000
  })

  console.log(missionContractDeployed.options.address)
});
