const host = process.argv[2];
const address = process.argv[3];
const from = process.argv[4];
const method = process.argv[5];

const solc = require('solc');
const web3 = require('./connect')(host);
const fs = require('fs');

const source = fs.readFileSync(`${process.cwd()}/contracts/structured.sol`, { encoding: 'utf-8' });
(async () => {
  const storageContract = solc.compile(source, 1)['contracts'][':Structured'];

  const contract = new web3.eth.Contract(JSON.parse(storageContract.interface), address);
  const results = await contract.methods.set('marko', 987).send({
    from: from
  });

  console.log('results');
  console.log(results);
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
