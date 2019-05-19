/**
 * Created by Micheal Thompson on 16/05/2019 at 9:06am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const ConnectWiseRest = require('connectwise-rest');
const cnwbot = require('./PostMessage');

const options = {
    companyId: 'claratti',
    companyUrl: 'api-aus.myconnectwise.net',
    entryPoint: 'v2019_3',
    publicKey: 'pag8CM6jgJ9L0UEF',
    privateKey: '8zZknlzzosoC7Z71'
};

const tickets = new ConnectWiseRest(options).ServiceDeskAPI.Tickets;

async function getTicketNotesById(ticketId) {
    
    const type = await tickets.getTicketById(ticketId).then((result) => {
                        return result;
    }).catch((err) => {
        cnwbot.onError(`Ouch! An Error has occurred please notify developer! \n ${err}`);
    })

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
        cnwbot.onError(`Ouch! An Error has occurred please notify developer! \n ${err}`)
    })
}

async function getTicketById(ticketId) {
    tickets.getTicketById(ticketId).then((result) => {
        console.log(result);
    }).catch((err) => {
        cnwbot.onError(`Ouch! An Error has occurred please notify developer! \n ${err}`)
    })
}

module.exports.getTicketNotesById = getTicketNotesById;
module.exports.getTicketById = getTicketById;