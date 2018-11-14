const host = process.argv[2];
const address = process.argv[3];
const from = process.argv[4];

const solc = require('solc');
const web3 = require('./connect')(host);
const fs = require('fs');

const source = fs.readFileSync(`${process.cwd()}/contracts/storage.sol`, { encoding: 'utf-8' });
(async () => {
  // const storageContract = solc.compile(source, 1)['contracts'][':Storage'];

  // const contract = new web3.eth.Contract(JSON.parse(storageContract.interface), address);
  // const results = await contract.methods.get().send({
  //   from: from
  // });

  // console.log(results);

  const results = await web3.eth.getStorageAt(address);

  console.log('results');
  console.log(web3.utils.toDecimal(results));
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
