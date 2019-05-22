/**
 * Created by Micheal Thompson on 16/05/2019 at 9:40am
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */

const cnw = require('./modules/Ticket');
const cnwbot = require('./modules/slack/PostMessage');

/*async function get() {
    const data = await cnw.getData();

    console.log(data);
}

get();*/

cnw.getData();

//cnw.postToSlack();