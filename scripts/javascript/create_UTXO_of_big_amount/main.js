const dotenv = require('dotenv').config();
const yesno = require("yesno");
const BigNumber = require("bignumber.js");
let bitcoin = require("bitcoinjs-lib");


const pvKey = process.env.PRIVATEKEY;
const from = process.env.FROM;
const to = process.env.OUTPUTADDRESS;


const bigAmountYouWantToSplit = 1030;
const decimals = 1e8;
const sendAmount = 1 * 1e7;
const counterr = 26;
const BN = BigNumber.clone({ DECIMAL_PLACES: 8 });


let network = {
    messagePrefix: '\x18BitCoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
        public: 0x022D2533,
        private: 0x0221312B,
    },
    pubKeyHash: 0x3C,
    scriptHash: 0xD,
    wif: 0xD4,
};

async function construct({ client }) {
    var counter = 1;
    var txid;
    var counter;
    var txID;
    var vout;
    let amount;
    let fee;
    let hex;
    let res;

    let unspent = await client.listUnspent(1, 9999999, [from]);
    while (counter < counterr) {

        if (txid != null) {
            txID = txid;
            vout = 1;
        } else {
            unspent.forEach(e => {
                if (
                    (e.amount > bigAmountYouWantToSplit) 
                ) {
                    txID = e.txid;
                    vout = e.vout;
                    amount = e.amount;
                    return;
                }
            });
        }
        const inputsTotal = unspent.length;
        
        fee = (
            (
                192
                + ((inputsTotal - 1) * 148)
                + (34 * 1)
            ) * 2000);

        amount = new BN(amount).times(decimals).minus(fee).minus(sendAmount);

        var tx = new bitcoin.TransactionBuilder(network);

        tx.addInput(txID, vout);
        tx.addOutput(to, sendAmount);
        tx.addOutput(from, amount.toNumber());

        try {
            // create and try to send transaction here check if transaction is large or small
            var keyPair = bitcoin.ECPair.fromWIF(pvKey, network);
            tx.sign(0, keyPair);

            hex = tx.build().toHex();
            res = await client.decodeRawTransaction(hex);

            console.info();
            console.info("Inputs total amount:", amount.toNumber());
            console.info("Output amount:", amount - fee);
            console.info("Fee:", fee);
            console.info();

            txid = await broadcast({ client, hex: hex });
            console.log(txid, "\n\n")
            amount = amount / decimals;

        } catch (e) {
            console.error(e);
            throw e;
        }
        counter++;
    }
}

async function broadcast({ client, hex }) {
    console.log("Broadcasting transaction...");
    const txid = await client.sendRawTransaction(hex);
    console.log("Done!");
    return txid;
}

module.exports = {
    construct,
    broadcast,
};