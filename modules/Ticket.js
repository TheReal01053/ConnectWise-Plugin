/**
 * Created by Micheal Thompson on 16/05/2019 at 9:06am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const ConnectWiseRest = require('./connectwise-rest');
const cnwbot = require('./slack/PostMessage');
const bird = require('bluebird')

const options = {
    companyId: 'claratti',
    companyUrl: 'api-aus.myconnectwise.net',
    entryPoint: 'v2019_3',
    publicKey: 'pag8CM6jgJ9L0UEF',
    privateKey: '8zZknlzzosoC7Z71',
};

const tickets = new ConnectWiseRest(options).ServiceDeskAPI.Tickets;

async function getTicketNotesById(ticketId) {
    
    const type = await tickets.getTicketById(ticketId).catch((err) => cnwbot.onError(`Ouch! An Error has occurred please notify author! \n ${ err }`))

    const department = type.department.identifier;
    tickets.getTicketNotesById(ticketId).then((result) => {
        var index = result.length - 1; //the last message sent
        clientResponse = result[index].text;
        cnwbot.onMessage(
            ticketId,
            department,
            clientResponse
        )
    }).catch((err) => {
        cnwbot.onError(`Ouch! An Error has occurred please notify author! \n ${ err }`)
    })
}

async function getTicketById(ticketId) {
    tickets.getTicketById(ticketId).then((result) => {
        console.log(result);
    }).catch((err) => {
        cnwbot.onError(`Ouch! An Error has occurred please notify author! \n ${ err }`)
    })
}

function getTickets() {
    return tickets.getTicketsBySize(1000).catch((err) => console.log(err));
}

async function getAllResponses(ticketId) {
    return await tickets.getTicketNotesById(ticketId);
}

function isClosed(status) {
    return status.includes('>Closed');
}

var ticketList = [];

async function getData(ticketId) {
    const response = await bird.map(getAllResponses(ticketId), result => { return result; }, {concurrency:5}).catch((err) => console.log(err));
    if (!ticketList.includes(response)) {
        ticketList.push(response);
    } else {
        console.log('contains record already!')
    }
}

async function postToSlack() {
    try {
    await getData();
        console.log(messages.length);
        messages.forEach((ticket) => {
           console.log(ticket.ticketId);
        })
    } catch (err) {
        cnwbot.onError(`Ouch! An Error has occurred please notify the author! \n ${ err }`)
    }
}

module.exports.ticketList = ticketList;
module.exports.getData = getData;
module.exports.postToSlack = postToSlack;
module.exports.getTicketNotesById = getTicketNotesById;
module.exports.getTicketById = getTicketById;
module.exports.getTickets = getTickets;
module.exports.getAllResponses = getAllResponses;
module.exports.isClosed = isClosed;