const Tickets = artifacts.require('Tickets');
const assert = require('assert');

contract('Tickets', (accounts) =>{
    const Buyer = accounts[1];
    const TicketId = 0;

    it('should allow a user to buy a ticket', async() =>{
        const instance = await Tickets.deployed();
        const originalTicket = await instance.tickets(TicketId);
        
        await instance.buyTicket(TicketId,{
            from:Buyer,
            value:originalTicket.price
        });

        const updatedTicket = await instance.tickets(TicketId);
        assert.equal(
            updatedTicket.owner,
            Buyer,
            'the buyer should now this ticket'
        );
    });
});