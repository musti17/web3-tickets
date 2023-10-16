import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';

import configuration from '../build/contracts/Tickets.json';

const Contract_Address = configuration.networks['5777'].address;
const Contract_ABI = configuration.abi;

const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:7545'
);

const contract = new web3.eth.Contract(Contract_ABI,Contract_Address);