const dotenv = require('dotenv').config();
const Client = require("bitcoin-core");

const port = process.env.port;
const username = process.env.username;
const password = process.env.password;


const { construct } = require("./main");


(async () => {
    const client = new Client({
        port: port,
        username: username,
        password: password,
    });

    try {
        await client.ping();
    } catch (e) {
        console.error("Connection error");
        console.error(e.toString());
        process.exit(1);
    }

    let tx;
    try {
        tx = await construct({
            client
        });
    } catch (e) {
        console.error("Constructing transaction error");
        console.error(e.toString());
        process.exit(1);
    }
})();