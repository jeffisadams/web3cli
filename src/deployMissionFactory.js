const fs = require('fs');

module.exports = (async (web3, args) => {
  if (args.length < 1) {
    console.log('Usage:\t "nodeGeth deployMissionContract <host> <from account>"');
    return;
  }

  const [ from ] = args;
  
  // This is the createMission contract
  const abi = JSON.parse(fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_CreateMission.abi`, { encoding: 'utf-8' }));
  const bin = fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_CreateMission.bin`, { encoding: 'utf-8' });

  const contractInstance = new web3.eth.Contract(abi, null, {
    data: '0x' + bin
  })

  const deployedContract = await contractInstance.deploy().send({
    from: from,
    gas: 5000000
  })

  console.log(deployedContract.options.address)
});
