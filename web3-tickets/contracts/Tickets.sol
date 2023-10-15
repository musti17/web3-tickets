pragma solidity >=0.4.22 <0.90;

uint constant Total_Tickets = 10;

contract Tickets{
    address public owner = msg.sender;

    struct Ticket{
        uint256 price;
        address owner;
    }

    Ticket[Total_Tickets] public tickets;

    constructor(){
        for(uint256 i = 0; i < Total_Tickets; i++)
        {
            tickets[i].price = 1e17; // 0.1 ETH
            tickets[i].owner = address(0x0);
        }
    }
}