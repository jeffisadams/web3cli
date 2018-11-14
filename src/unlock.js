module.exports = (async (web3, args) => {
  const [ account, password ] = args;
  await web3.eth.personal.unlockAccount(account, password);
});
