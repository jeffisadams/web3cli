
var Web3 = require('web3');

let web3;
module.exports = (host) => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}`));
    web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${host}`))
  }

  return web3;
}