/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/PostMessage');
const ConnectWiseRest = require('connectwise-rest');

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
    for (var i = 0; i <= 2000; i++) {
        if (ticketAPI.getTicketById)
        console.log(i);
        const json = await ticketAPI.getTicketById(i).then((result) => {
            //if (result.stat)
            tickets.push(result);
        }).catch((err) => console.log('err'));
    }

    //return console.log(ticket[0]);
    tickets.forEach((ticket) => {
        console.log(ticket.status);
    })
}

getData();

//cnw.getTicketById(1097);