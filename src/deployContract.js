const host = process.argv[2];
const contractName = process.argv[3];
const from = process.argv[4];

const solc = require('solc');
const web3 = require('./connect')(host);
const fs = require('fs');

const source = fs.readFileSync(`${process.cwd()}/contracts/${contractName.toLowerCase()}.sol`, { encoding: 'utf-8' });
(async () => {
  const storageContract = solc.compile(source, 1)['contracts'][`:${contractName}`];
  const contract = new web3.eth.Contract(JSON.parse(storageContract.interface), null, {
    data: '0x' + storageContract.bytecode
  });

  const deployedContract = await contract.deploy().send({
    from: from,
    gas: 1000000
  });
  console.log(deployedContract.options.address);
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
