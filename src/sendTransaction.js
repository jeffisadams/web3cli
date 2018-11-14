const host = process.argv[2];
const from = process.argv[3];
const to = process.argv[4];
const ether = process.argv[5];

const web3 = require('./connect')(host);

/**
 * Send money using command line args
 */
(async () => {
  // await web3.eth.personal.unlockAccount(from, '!@superpassword');

  await web3.eth.sendTransaction({
    from: from,
    to: to,
    value: web3.utils.toWei(ether.toString(), "ether")
  });

})()
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.log('error');
    console.log(err);
  })
