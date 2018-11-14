const solc = require('solc');
const fs = require('fs');

module.exports = (async (web3, args) => {
  const [ contractName, from ] = args;
  const source = fs.readFileSync(`${process.cwd()}/contracts/${contractName.toLowerCase()}.sol`, { encoding: 'utf-8' });

  const storageContract = solc.compile(source, 1)['contracts'][`:${contractName}`];
  const contract = new web3.eth.Contract(JSON.parse(storageContract.interface), null, {
    data: '0x' + storageContract.bytecode
  });

  const deployedContract = await contract.deploy().send({
    from: from,
    gas: 1000000
  });
  console.log(deployedContract.options.address);
});
