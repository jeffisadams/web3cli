/**
 * Send money using command line args
 */
module.exports = (async (web3, args) => {
  const [ from, to, ether ] = args;
  await web3.eth.sendTransaction({
    from: from,
    to: to,
    value: web3.utils.toWei(ether.toString(), "ether")
  });

});
