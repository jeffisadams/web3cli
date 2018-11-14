#!/usr/bin/env node

const command = process.argv[2];
const host = process.argv[3];
const web3 = require('./src/connect')(host);

const args = process.argv.slice(4);
(require(`./src/${command}.js`)(web3, args))
  .then(() => {
    console.log(0);
  })
  .catch(err => {
    console.log(1);
  })

