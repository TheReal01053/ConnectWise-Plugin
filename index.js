/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');

cnw.getTicketNotesById(1097);



var resp = [];

//setInterval(async () => {
async function read() {
    try {
        const tickets = await cnw.getTickets().catch((err) => console.log(err));

            tickets.forEach(async (ticket) => {
                if (!cnw.isClosed(ticket.status.name)) {
                    const query = await cnw.getAllResponses(ticket.id).catch((err) => console.log(err));
                    const ticketId = query[0].ticketId;
                    const responses = query[0].text;
                    
                    resp.push({
                        id: ticketId,
                        response: responses
                    })
                }
            })
        } catch (e) {
    }
}

read();

async function hasUpdated() {
    await read();
    resp.forEach((result) => {
        if (result[index].text != responses) {
            console.log('send to slack!');
        }
    })
}