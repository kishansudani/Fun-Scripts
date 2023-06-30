> Single process will create only 25 Minor UTXO MAX.

> Edit out your fee calculation in `main.js`

> Create `.env` file
```bash
port=
username=
password=
PRIVATEKEY=
FROM=
OUTPUTADDRESS=
```

> edit `main.js` file
```bash
bigAmountYouWantToSplit =
decimals =
sendAmount =
network = {}
```

> edit your `coin.conf`
```bash
rpcuser=        (required)
rpcpassword=    (required)
rpcport=        (required)
daemon=1        (optional)
server=1        (optional)
txindex=1       (optional)
```

> run command
```bash
node connection.js
```