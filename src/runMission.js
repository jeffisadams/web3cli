const fs = require('fs');

module.exports = (async (web3, args) => {
  if (args.length < 4) {
    console.log('Usage:\t "nodeGeth runMission <host> <contract Address> <from account> <assignee> <scans ipfs hash>"');
    return;
  }
  const [ address, from, assignee, scanHash ] = args;
  const abi = JSON.parse(fs.readFileSync(`${process.cwd()}/contractBuild/contracts_mission_sol_Mission.abi`, { encoding: 'utf-8' }));

  // // Instantiate the contract locally
  const contract = new web3.eth.Contract(abi, address);

  console.log('\nmission specific methods')
  console.log(contract.methods)


  const assign = await contract.methods.assign(assignee).send({
    from: from
  })
  console.log('\nAssign newly created contract to account')
  // console.log(assign)

  const beforeBalance = await contract.methods.getBalance().call({
    from: assignee,
    gas: 5000000
  })
  console.log(`\nThe balance on the contract before submission: ${beforeBalance}`)


  const submitResult = await contract.methods.submit(scanHash).send({
    from: assignee,
    gas: 5000000
  })
  console.log('submitResult')
  console.log(submitResult)

  const scanIPFSHash = await contract.methods.scanAddress().call()
  console.log(`\nThe submittedd scan address: ${scanIPFSHash}`)

  const afterBalance = await contract.methods.getBalance().call({
    from: assignee,
    gas: 5000000
  })
  console.log(`\nThe final contract balance: ${afterBalance}`)
});
