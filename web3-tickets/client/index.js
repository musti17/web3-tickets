import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';

import configuration from '../build/contracts/Tickets.json';

const Contract_Address = configuration.networks['5777'].address;
const Contract_ABI = configuration.abi;

// Create a Web3 instance using the injected provider (e.g., MetaMask)
const web3 = new Web3(window.ethereum || 'http://127.0.0.1:7545');

const contract = new web3.eth.Contract(Contract_ABI, Contract_Address);

let account;

const accountEl = document.getElementById('account');

const main = async () => {
    try {
        // Request access to user accounts using the new method
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        accountEl.innerText = account;
    } catch (error) {
        console.error('Error requesting accounts:', error);
    }
};

main();
