const solc = require('solc');
const abiDecoder = require('abi-decoder');
const fs = require('fs');

module.exports = (async (web3, args) => {
  if (args.length < 2) {
    console.log('Usage:\t "nodeGeth getData <host> <contract Name title case> <contract address>"');
    return;
  }

  const [ contractName, blockNumber ] = args
  const source = fs.readFileSync(`${process.cwd()}/contracts/${contractName.toLowerCase()}.sol`, { encoding: 'utf-8' });

  const storageContract = solc.compile(source, 1)['contracts'][`:${contractName}`];
  abiDecoder.addABI(JSON.parse(storageContract.interface));
  const block = await web3.eth.getTransactionFromBlock(blockNumber);
  const decodedData = abiDecoder.decodeMethod(block.input);
  console.log(decodedData);
});
