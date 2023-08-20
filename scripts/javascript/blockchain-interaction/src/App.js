import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const [signer, setSigner] = useState(null);
    const [ethBalance, setEthBalance] = useState("0");
    const [tokenBalance, setTokenBalance] = useState("0");
    const [receiverAddress, setReceiverAddress] = useState(
        "0x3a7a5392e1BD8bf7A45E7a9275db6Cc8356b1fA5"
    );

    const avlNetwork = {
        137: {
            chainId: `0x${Number(137).toString(16)}`,
            rpcUrls: ["https://rpc-mainnet.matic.network/"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com/"],
        },
    };

    useEffect(() => {
        const initEthers = async () => {
            // Check if metamask is installed or not
            if (window.ethereum) {
                // inject metamask and use current RPC provider
                const providers = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                setProvider(providers);
                // get signer for TX
                const signers = providers.getSigner();
                setSigner(signers);
            } else {
                console.log('Please install metamask')
            }
        };
        initEthers();
    }, []);

    const connect = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            // fetch metamask account
            const accounts = await provider.send("eth_requestAccounts", []);
            setAddress(accounts[0]);
        } else {
            console.log("Please install metamask");
        }
    };

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [avlNetwork[137]],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const sendEth = async () => {
        if (signer && receiverAddress) {
            const transaction = {
                to: receiverAddress,
                value: ethers.utils.parseEther("0.1"),
            };
            const txResponse = await signer.sendTransaction(transaction);
            await txResponse.wait();

            // Refresh balances
            await refreshBalances();
        } else {
            console.log(">>> signer ", signer, "\n>>> recadd", receiverAddress);
        }
    };

    const sendToken = async () => {
        if (signer && receiverAddress) {
            // token contract address
            const tokenAddress = "0x1D56Ff342BF0F11bD96aE4B0B4493197aC997F59"; 
            // contract abi
            const tokenAbi = [
                {
                    constant: true,
                    inputs: [{ name: "owner", type: "address" }],
                    name: "balanceOf",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: "_to",
                            type: "address",
                        },
                        {
                            name: "_value",
                            type: "uint256",
                        },
                    ],
                    name: "transfer",
                    outputs: [
                        {
                            name: "",
                            type: "bool",
                        },
                    ],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ];
            
            const tokenContract = new ethers.Contract(
                tokenAddress,
                tokenAbi,
                signer
            );

            // contract call for write
            const tx = await tokenContract.transfer(
                receiverAddress,
                ethers.BigNumber.from("100", "ethers")
            );
            await tx.wait();

            // Refresh balances
            await refreshBalances();
        }
    };

    const refreshBalances = async () => {
        if (address) {
            const balance = await provider.getBalance(address);
            setEthBalance(ethers.utils.formatEther(balance));

            const tokenAddress = "0x1D56Ff342BF0F11bD96aE4B0B4493197aC997F59"; // Replace with your token contract address
            const tokenAbi = [
                {
                    constant: true,
                    inputs: [{ name: "owner", type: "address" }],
                    name: "balanceOf",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                },
            ];

            const tokenContract = new ethers.Contract(
                tokenAddress,
                tokenAbi,
                provider
            );

            // contract call for read
            const tokenBalance = await tokenContract.balanceOf(address);
            setTokenBalance(tokenBalance.toString());
        } else {
            console.log("Address is : ", address);
        }
    };

    return (
        <div className="App">
            <h1>Ethers.js Ethereum Interaction</h1>
            <div>
                <h2>Account Information</h2>
                <p>ETH Balance: {ethBalance} ETH</p>
                <p>Token Balance: {ethers.utils.formatEther(tokenBalance)}</p>
            </div>
            <div>
                <label>Receiver Address:</label>
                <input
                    type="text"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                />
                <br />
                <br />
                <button onClick={connect}>connect</button>
                <br />
                <br />
                <button onClick={refreshBalances}>refreshBalances</button>
                <br />
                <br />
                <button onClick={sendEth}>Send ETH</button>
                <br />
                <br />
                <button onClick={sendToken}>Send Token</button>
                <br />
                <br />
                <button onClick={switchNetwork}>switchNetwork</button>
            </div>
        </div>
    );
};

export default App;
