/**
 * Created by Micheal Thompson on 16/05/2019 at 4:21pm
 * @author Micheal Thompson <micheal.thompson@claratti.com>
 */
const request = require('request-promise');

const AUTHOR_NAME = 'Micheal Thompson';
const AUTHOR_ICON = 'https://i.imgur.com/hdGLXqb.jpg'
const WORKSPACE_HOOK = 'T5WFJ8VC6/BJUQKBZ46/6RBKNBTUO4mQTDhO9hMUHCwx';
const NETWORKS_HOOK = 'T5WFJ8VC6/BJF7W2DTL/Ym9QkdT9FPNZbmZ7QknFH2I5';
const CHANNEL_ID = ['GJUEKV4S3', 'GJV6FP38F'] //Workspace => Networks
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';
const SCAN_INTERVAL = '20000';

async function onMessage(ticketId, department, response) {
    try {

        //ternary operator for dynamically directing messages based on the department of the ticket.
        const channel = department.includes('Workspace') ? CHANNEL_ID[0] : department.includes('Telco') ? CHANNEL_ID[1] : '';
        const hook = department.includes('Workspace') ? WORKSPACE_HOOK : department.includes('Telco') ? NETWORKS_HOOK : '';

        const message = {
            text: '',
            channel: channel,
            attachments: [
                {
                    text: response,
                    author_name: `You have received a new resonse on ticket #${ ticketId }`,
                    author_icon: AUTHOR_ICON,
                    fallback: `An error has occured please notify: ${ AUTHOR_NAME }`,
                    color: 'good',
                }
            ]
        };
        const res = await request({ 
            url: `https://hooks.slack.com/services/${ hook }`,
            method: 'POST',
            body: message,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': USER_AGENT
            },
        });
    } catch (e) {
        console.log(`An error has occured whilst posting message to slack please notify ${ AUTHOR_NAME }\n`, e);
    }
}

async function onError(response) {
    try {

        const message = {
            text: '',
            channel: CHANNEL_ID[0],
            attachments: [
                {
                    text: response,
                    author_name: 'Error!',
                    author_icon: AUTHOR_ICON,
                    fallback: `An error has occured please notify: ${ AUTHOR_NAME }`,
                    color: 'good',
                }
            ]
        };
        const res = await request({ 
            url: `https://hooks.slack.com/services/${ WORKSPACE_HOOK }`,
            method: 'POST',
            body: message,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': USER_AGENT
            },
        });
    } catch (e) {
        console.log(`An error has occured whilst posting message to slack please notify ${ AUTHOR_NAME }\n`, e);
    }
}

module.exports.onMessage = onMessage;
module.exports.onError = onError;