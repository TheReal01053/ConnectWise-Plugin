/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');

const SCAN_INTERVAL = 300000; // 5 minutes

setInterval(async () => {
    const ticket = await cnw.getQuery();
    ticket.forEach(async (tickets) => cnw.getData(tickets.id))
    cnw.postToSlack();
}, SCAN_INTERVAL)