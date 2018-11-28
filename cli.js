#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length < 4) {
  console.log('\nYou can run any of the following scripts');

  fs.readdirSync('./src').forEach(script => {
    console.log('\t' + script.split('.')[0]);
  });
  console.log('');
  process.exit();
}


const command = process.argv[2];
const host = process.argv[3];
const web3 = require('./src/connect')(host);


const args = process.argv.slice(4);
(require(`./src/${command}.js`)(web3, args))
  .then(() => {
    // Manual Disconnect
    setTimeout(() => { web3.currentProvider.connection.close() }, 1000)
  })
  .catch(err => {
    console.log(err);
    console.log(err.message)
    setTimeout(() => { web3.currentProvider.connection.close() }, 1000)
  })




