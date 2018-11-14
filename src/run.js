const solc = require('solc');
const fs = require('fs');

const source = fs.readFileSync(`${process.cwd()}/contracts/structured.sol`, { encoding: 'utf-8' });
module.exports = (async (web3, args) => {
  const [ address, from, method ] = args;
  const storageContract = solc.compile(source, 1)['contracts'][':Structured'];

  const contract = new web3.eth.Contract(JSON.parse(storageContract.interface), address);
  
  // This is not fully implemented
  const results = await contract.methods[method]().send({
    from: from
  });

  console.log(results);
});
