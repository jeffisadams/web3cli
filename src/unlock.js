module.exports = (async (web3, args) => {
  if (args.length < 2) {
    console.log('Usage:\t "nodeGeth unlock <host> <account> <password>"');
    return;
  }
  const [ account, password ] = args;
  await web3.eth.personal.unlockAccount(account, password);
});
