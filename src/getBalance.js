/**
 * Get the balance for the sent account
 */
module.exports = (async (web3, args) => {
  if (args.length < 1) {
    console.log('Usage:\t "nodeGeth getBalance <host> <account>"');
    return;
  }
  const [ account ] = args;
  const balance = await web3.eth.getBalance(account);

  console.log(balance);
});
