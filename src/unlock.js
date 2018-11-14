const host = process.argv[2];
const account = process.argv[3].toString();
const password = process.argv[4];

const web3 = require('./connect')(host);

(async () => {
  await web3.eth.personal.unlockAccount(account, password);
})()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.log('error');
    console.log(err);
  })
