/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');
const bird = require('bluebird')

const tickets = [];

async function getData() {
    try {
        const query = await cnw.getTickets();

        await bird.map(query, async (result) => {
            const ticket = await result;
            if (!cnw.isClosed(ticket.status.name)) {
                await cnw.getAllResponses(ticket.id).then((response) => {
                    count++;
                    const index = response.length - 1; //last client response in index
                    const ticketId = response[index].ticketId; //ticket id
                    const message = response[index].text; //clients response
    
                    console.log(tickets.includes(ticketId));
                        tickets.push({
                            id: ticketId,
                            response: message
                        })
                });
            }
        }, { concurrency: 10 });
    } catch (error) {
    }
    console.log(tickets.length);
}

getData();

async function postToSlack() {
    try {
        await getData();

        await bird.map(tickets, async (ticket) => {
            await cnw.getAllResponses(ticket.id).then((result) => {
                //console.log(tickets.length);
                const index = result.length - 1;
                const response = result[index].text;

                if (ticket.response === response)
                    return;

                    console.log('A new response has been found on ticket #' + ticket.id + ' posting to slack!');
                    ticket.response = response;
                    cnw.getTicketNotesById(ticket.id);
            })
        }, { concurrency: 1 });

    } catch (err) {
        cnwbot.onError(`Ouch! An Error has occurred please notify the author! \n ${ err }`)
    }
}


setInterval(() => {
    postToSlack();
}, 30000)