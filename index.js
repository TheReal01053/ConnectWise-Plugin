/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');
const bird = require('bluebird')

/*async function get() {
    const data = await cnw.getData();

    console.log(data);
}

get();*/

async function getQuery() {
    return await bird.map(cnw.getTickets(), result => { return result; }, {concurrency:5}).filter(result => !cnw.isClosed(result.status.name)).catch((err) => console.log(err));
}

async function get() {
    //await getQuery();
    const ticket = await getQuery();
    ticket.forEach((ticket) => {
        cnw.getData(ticket.id);
    })
}

get();

setInterval(() => {
    cnw.ticketList.forEach((ticket) => {

    })
}, 15000)

//cnw.postToSlack();