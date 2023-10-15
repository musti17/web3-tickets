// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

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

    function buyTicket(uint256 _index) external payable{
        require(_index >= 0 && _index < Total_Tickets); //make sure that tickets id is btw 0-9
        require(tickets[_index].owner == address(0x0));//make sure that ticket is not owned by anyone
        require(msg.value >= tickets[_index].price);//make sure that enough money sent to function
        tickets[_index].owner = msg.sender;
    }
}