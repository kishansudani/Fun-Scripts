const { ethers } = require("ethers");

require("dotenv").config();
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;
const RPC = process.env.RPC;

const {
    abi: RouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");

const RouterAddress = "";

const WETHAddress = "";
const USDAddress = "";
const UNIAddress = "";

const routerContract = new ethers.Contract(RouterAddress, RouterABI);
const provider = new ethers.provider.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(WALLET_SECRET);
const signer = wallet.connect(provider);

const encodePath = (path, fees) => {
    let FEE_SIZE = 3;
    if (path.length != fees.length + 1) {
        throw new Error("path/fee length mismatch");
    }

    let encoded = "0x";
    for (let i = 0; i < fees.length; i++) {
        encoded += path[i].slice(2);
        encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0");
    }

    encoded += path[path.length - 1].slice(2);
    return encoded.toLowerCase();
};

const main = async () => {
    let deadline = Math.floor(Date.now() / 1000) + (10 * 60);

    const path = encodePath([WETHAddress, UNIAddress, USDAddress], [3000, 3000])

    const parms = {
        path: path,
        recipient: WALLET_ADDRESS,
        deadline: deadline,
        amountIn: ethers.utils.parseEther('0.1'),
        amountOutMinimum: 0
    }

    const encodedData = routerContract.interface.encodeFunctionData("exactInput", [parms])

    const txArgs = {
        to: RouterAddress,
        from: WALLET_ADDRESS,
        data: encodedData,
        gasLimit: ethers.utils.hexify(1000000)
    }

    const tx = await signer.sendTransaction(txArgs)
    console.log(tx)

};
