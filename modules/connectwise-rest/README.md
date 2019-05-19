# connectwise-rest

 [![npm version](https://img.shields.io/npm/v/connectwise-rest.svg)](https://www.npmjs.com/package/connectwise-rest) [![npm downloads](https://img.shields.io/npm/dt/connectwise-rest.svg)](https://www.npmjs.com/package/connectwise-rest) [![travis build](https://api.travis-ci.org/covenanttechnologysolutions/connectwise-rest.svg?branch=master)](https://travis-ci.org/covenanttechnologysolutions/connectwise-rest)

A nodejs module for interacting with the ConnectWise REST API.   This module is currently under construction.  This module provides bindings for ease of development against the ConnectWise REST API. 

## Requirements

- ConnectWise 2018.1+, though these functions are written for ConnectWise 2016.1 APIs (API3.0 v1.0.0). 
- ConnectWise API keys (available on ConnectWise 2015.3+), or API Only Member keys (only available on ConnectWise 2015.6+).  See the [documentation](https://developer.connectwise.com/Authentication) for more details. 

## Documentation

See the documentation [here](https://github.com/covenanttechnologysolutions/connectwise-rest/blob/master/doc.md)

## Usage

Create a new API key, or API Only Member, then instantiate the module.  

```javascript
    
    const ConnectWiseRest = require('connectwise-rest');
    
    const cw = new ConnectWiseRest({
        companyId: 'company',
        companyUrl: 'your.connectwise.com',
        publicKey: '<public key>',
        privateKey: '<private key>',
        clientId: '<your client id>',
        entryPoint: 'v4_6_release', // optional, defaults to 'v4_6_release'
        timeout: 20000,             // optional, request connection timeout in ms, defaults to 20000
        retry: false,               // optional, defaults to false
        retryOptions: {             // optional, override retry behavior, defaults as shown
          retries: 4,               // maximum number of retries
          minTimeout: 50,           // number of ms to wait between retries
          maxTimeout: 20000,        // maximum number of ms between retries
          randomize: true,          // randomize timeouts
        },
        debug: false,               // optional, enable debug logging
        logger: (level, text, meta) => { } // optional, pass in logging function
    });
    
    cw.ServiceDeskAPI.Tickets.getTicketById(1234)
        .then((ticket) => {
            //do something with results
        })
        .catch((error) => {
            //handle errors
        });
```

Or if you only require access to one API component:

```javascript

    const ConnectWiseRest = require('connectwise-rest');
    
    const tickets = new ConnectWiseRest(options).ServiceDeskAPI.Tickets;
    
    tickets.getTicketById(1234)
        .then(function (result){
            //do something with results
        })
        .catch(function (error){
            //handle errors
        });
```

You can also manually access the API:

```javascript

    const ConnectWiseRest = require('connectwise-rest');

    const api = new ConnectWiseRest(options).API.api;

    api('/path/to/api', 'POST', {
        'param1': 'val1',
        'param2': 'val2'
    })
    .then((result) => {
        //do something with results
    })
    .catch((error) => {
        //handle errors
    });
```

### Cloud-Hosted ConnectWise 

To access cloud-hosted ConnectWise, use the `companyUrl` of `api-na.myconnectwise.net` and override the default `entryPoint`.

| Region | |
| --- | --- |
| North America | api-na.myconnectwise.net |
| Europe | api-eu.myconnectwise.net |
| Australia | api-aus.myconnectwise.net |
| Demo | api-staging.connectwisedev.com |

```javascript
    options = {
        companyId: 'company',
        companyUrl: 'api-na.myconnectwise.net',
        entryPoint: 'v2019_3', // change to the current hosted version 
        publicKey: '<public key>',
        privateKey: '<private key>'
    }
```

## Implemented APIs

| Module           | API                 | Status                        |
| ---------------- | ------------------- | ----------------------------- |
| Company API      | Companies           | Complete                      |
| Company API      | CompanyTeams        | Complete                      |
| Company API      | Configurations      | Complete                      |
| Company API      | Contacts            | Complete                      |
| Finance API      | Additions           | Complete                      |
| Finance API      | Adjustments         | Complete                      |
| Finance API      | Agreements          | Complete                      |
| Finance API      | AgreementSites      | Complete                      |
| Finance API      | BoardDefaults       | Complete                      |
| Finance API      | WorkRoles           | Complete                      |
| Finance API      | WorkTypeExclusions  | Complete                      |
| Finance API      | WorkTypes           | Complete                      |
| Project API      | Projects            | Complete                      |
| ScheduleAPI      | ScheduleEntries     | Complete                      |
| ScheduleAPI      | ScheduleTypes       | Complete                      |
| Service Desk API | Boards              | Complete                      |
| Service Desk API | BoardTeams          | Complete                      |
| Service Desk API | Priorities          | Complete                      |
| Service Desk API | ServiceNotes        | Complete                      |
| Service Desk API | Statuses            | Complete                      |
| Service Desk API | Tickets             | Complete                      |
| System API       | Members             | Complete                      |
| System API       | Reports             | Complete                      |
| Time API         | TimeEntries         | Complete                      |


## Examples

### Code Examples

Get ticket 1234 and print ticket number, summary and status. 

```javascript

    tickets.getTicketById(1234)
        .then((ticket) => { console.log(ticket.id, ticket.summary, ticket.status.name); })
        .catch((err) => { console.log(err); });
```

Create new ticket on service board, then print the returned ticket number, or any errors

```javascript

    tickets.createTicket({
        summary: "This is the summary",
        board: {
            name: "Service Board"
        },
        company: {
            identifier: "ABC" //company ID
        },
        initialDescription: "ticket description",
        recordType: "ServiceTicket"
        //can also pass in any other Ticket object settings as needed
    })
    .then((ticket) => { console.log(ticket.id); })
    .catch((err) => { console.log(err); });    
    
```

Change the status of a ticket

```javascript

    updateTicket(1234, [{
        op: 'replace',
        path: 'status',
        value: {id: 123} //id of the status to change to, find with boards.getBoards and status.getStatuses
    }, {
        //second or more operations
    }])
    .then((res) => { //do something with returned ticket });
    .catch((err) => { //do something with errors });    

```

### Conditions 

Valid example conditions string:
  
```javascript

    const conditions = '(contact/name like "Fred%" and closedFlag = false) and dateEntered > [2015-12-23T05:53:27Z] or summary contains "test" AND  summary != "Some Summary"'

```

Error message returned from server when invalid conditions are passed in:
> Expected a boolean value, not a numeric. String values should be enclosed with double or single quotes; DateTime values should be enclosed in square brackets; numbers should consist of only digits, and optionally a decimal point and a negation sign; boolean values should be indicated with the keywords true or false; null values should be indicated by the keyword null.


### Callbacks

This library includes an express style callback middleware that will parse and verify the payload signature.

```javascript 

  const CWCallback = cw.utils.Callback;
  
  router.post('/your/callback', CWCallback.middleware((err, req, res, verified, payload) => {
    if (err) {
      //handle error, parsing, malformed object, etc
      res.status(500).end();
    } else if (!verified) {
      // send 403 on verification failure, 
      // or handle some other way
      res.status(403).end();
    } else {
      res.status(200).end()
    }
    const {action, id} = req.query;
    // do something with the payload
  }));

```

See also using [verifyCallback](https://github.com/covenanttechnologysolutions/connectwise-rest/blob/master/doc.md#verifyCallback) manually.
