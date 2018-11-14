const host = process.argv[2];
const account = process.argv[3];

const web3 = require('./connect')(host);

/**
 * Get the balance for the sent account
 */
(async () => {
  const balance = await web3.eth.getBalance(account);

  console.log(balance);
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
