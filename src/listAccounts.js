const host = process.argv[2];

const web3 = require('./connect')(host);

/**
 * Get the balance for the sent account
 */
(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  });
