import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';

import configuration from '../build/contracts/Tickets.json';

import ticketImage from '../images/ticket.png';

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
}

const Contract_Address = configuration.networks['5777'].address;
const Contract_ABI = configuration.abi;

// Create a Web3 instance using the injected provider (e.g., MetaMask)
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

const contract = new web3.eth.Contract(Contract_ABI, Contract_Address);

const TOTAL_TICKETS = 10;
let account;

const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');

const buyTicket = async (ticket) =>{
    await contract.methods.buyTicket(ticket.id).send({
        from: account,
        value:ticket.price
    });
    await refreshTickets();
}

const refreshTickets = async() => {
    ticketsEl.innerHTML = '';
    for(let i = 0; i < TOTAL_TICKETS; i++){
        const ticket = await contract.methods.tickets(i).call();
        ticket.id = i;
        if(ticket.owner === EMPTY_ADDRESS)
        {
            const priceInEth = parseFloat(ticket.price) / 1e18;

            const ticketEl = createElementFromString(
                `<div class="ticket card" style="width: 18rem;">
                <img src="${ticketImage}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">${priceInEth} Eth</p>
                  <button id='btn' class="btn btn-primary">Buy</button>
                </div>
              </div>`
            );
            const button = ticketEl.querySelector('button');
            button.onclick = buyTicket.bind(null,ticket);
            ticketsEl.appendChild(ticketEl);
        }
    }
}

const main = async () => {
    try {
        // Request access to user accounts using the new method
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        accountEl.innerText = account;
        await refreshTickets();
    } catch (error) {
        console.error('Error requesting accounts:', error);
    }
};

main();