/**
 * Get the balance for the sent account
 */
module.exports = (async (web3, args) => {
  const [ account ] = args;
  const balance = await web3.eth.getBalance(account);

  console.log(balance);
});
