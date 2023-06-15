const Web3 = require("web3");
const prompts = require("prompts");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "mydatabase";
const collectionName = "mycollection";

const questions = [
  {
    type: "number",
    name: "numberOfWallets",
    message: "How many wallets do you want to generate?",
    initial: 100,
    min: 1,
  },
];

const getLastKey = async (collection) => {
  try {
    const lastInsertedDocument = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    console.log(lastInsertedDocument);
    if (lastInsertedDocument.length !== 0) {
      return Promise.resolve(Object.keys(lastInsertedDocument[0])[0]).catch(
        (err) => {
          console.log(err);
        }
      );
    }
    return 0;
  } catch (err) {
    console.log(err);
  }
};

const generate = async () => {
  console.clear();
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { numberOfWallets } = await prompts(questions);

  const web3 = new Web3("https://mainnet.infura.io/");
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    let lastInsertedKey = parseInt(await getLastKey(collection)) + 1;
    for (let i = 0; i < numberOfWallets; i++) {
      const wallet = web3.eth.accounts.create(web3.utils.randomHex(32));
      let obj = {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };

      try {
        await collection.insertOne({ [lastInsertedKey]: obj });
        lastInsertedKey += 1;
      } catch (error) {
        console.error("Error inserting document:", error);
      }
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    client.close();
  }
};

generate();
