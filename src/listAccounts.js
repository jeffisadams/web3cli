/**
 * Get the balance for the sent account
 */
module.exports = (async (web3) => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
});
