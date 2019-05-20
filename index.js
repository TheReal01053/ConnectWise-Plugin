/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');
const ConnectWiseRest = require('./modules/connectwise-rest');

const options = {
    companyId: 'claratti',
    companyUrl: 'api-aus.myconnectwise.net',
    entryPoint: 'v2019_3',
    publicKey: 'pag8CM6jgJ9L0UEF',
    privateKey: '8zZknlzzosoC7Z71'
};

const ticketAPI = new ConnectWiseRest(options).ServiceDeskAPI.Tickets;

var tickets = [];

function queryAPI() {
    return ticketAPI.getTicketsBySize(1000).catch((err) => console.log(err));
}

async function readData() {
    const tickets = await queryAPI();

    tickets.forEach((ticket) => {
        console.log(ticket.summary);
    })
}

readData();