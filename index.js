/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');
const bird = require('bluebird')

/*async function getQuery() {
    return await bird.map(cnw.getTickets(), result => { return result; }, {concurrency:5}).filter(result => !cnw.isClosed(result.status.name)).catch((err) => console.log(err));
}*/


setInterval(async () => {
    const ticket = await cnw.getQuery();
    ticket.forEach(async (tickets) => cnw.getData(tickets.id))
    cnw.postToSlack();
}, 5000)