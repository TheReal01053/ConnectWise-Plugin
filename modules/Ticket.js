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

//Get all non-closed tickets
async function getQuery() {
    return await bird.map(getTickets(), result => { return result; }, {concurrency:5}).filter(result => !isClosed(result.status.name)).catch((err) => console.log(err));
}

var ticketList = [];

/**
 * Retrieves all responses against tickets and caches them into an array
 * which i can use later to compare whether a new response has been made against the ticket6
 * @param {tickedId to get responses from corresponding ticket} ticketId 
 */

async function getData(ticketId) {
    try {
        await bird.map(getAllResponses(ticketId), result => { return result; }).then(response => {
            var index = response.length - 1;
            var isTrue = ticketList.some(x => x.id == ticketId);
    
            if (!isTrue) {
                ticketList.push({
                    id: response[index].ticketId,
                    message: response[index].text
                });
            } else {
            }
        })
    } catch (e) {

    }
}

async function postToSlack() {
    ticketList.forEach(async (ticket) => {
        var message = await bird.map(getAllResponses(ticket.id), result => { return result }, { concurrency: 10 }).catch((err) => console.log(err));

        var index = message.length - 1;
        if (ticket.message.includes(message[index].text)) {
            //console.log("message exists")
        } else {
            getTicketNotesById(ticket.id);
            ticket.message = message[index].text;
            //console.log("message doesn't exist")
        }
    })
}

module.exports.getQuery = getQuery;
module.exports.ticketList = ticketList;
module.exports.getData = getData;
module.exports.postToSlack = postToSlack;
module.exports.getTicketNotesById = getTicketNotesById;
module.exports.getTicketById = getTicketById;
module.exports.getTickets = getTickets;
module.exports.getAllResponses = getAllResponses;
module.exports.isClosed = isClosed;