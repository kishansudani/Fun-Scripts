const fs = require('fs');
const Web3 = require('web3');
const prompts = require('prompts');

const questions = [
  {
    type: 'number',
    name: 'numberOfWallets',
    message: 'How many wallets do you want to generate?',
    initial: 100,
    min: 1,
  },
  {
    type: 'text',
    name: 'fileName',
    message: 'Enter the output file name',
    initial: 'wallets',
    validate: (value) =>
      value.length > 0 || 'Please enter a valid file name',
  },
];

(async () => {
  console.clear();

  const { numberOfWallets, fileName } = await prompts(questions);

  // Connect to the Ethereum network since it doesn't matter which network
  // you're connected to.
  const web3 = new Web3('https://mainnet.infura.io/');

  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = web3.eth.accounts.create(web3.utils.randomHex(32));

    fs.appendFileSync(
      `${fileName}.txt`,
      `${wallet.address}=${wallet.privateKey}\n`
    );
  }
})();
