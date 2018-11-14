const host = process.argv[2];
const contractName = process.argv[3];
const blockNumber = process.argv[4];

const solc = require('solc');
const abiDecoder = require('abi-decoder');
const web3 = require('./connect')(host);
const fs = require('fs');

const source = fs.readFileSync(`${process.cwd()}/contracts/${contractName.toLowerCase()}.sol`, { encoding: 'utf-8' });
(async () => {
  const storageContract = solc.compile(source, 1)['contracts'][`:${contractName}`];
  abiDecoder.addABI(JSON.parse(storageContract.interface));
  const block = await web3.eth.getTransactionFromBlock(blockNumber);
  const decodedData = abiDecoder.decodeMethod(block.input);
  console.log(decodedData);
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
