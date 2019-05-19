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

async function getData() {
    const tickets = [];
    for (var i = 100; i <= 200; i++) {
        if (ticketAPI.getTicketById)
        console.log(i);
        const json = await ticketAPI.getTicketById(i).then((result) => {
            //if (result.stat)
            tickets.push(result);
        }).catch((err) => console.log('err'));
    }
    
    tickets.forEach((ticket) => {
        console.log(ticket.summary + ":  " + ticket.id);
    })
}

getData();

//cnw.getTicketById(1097);