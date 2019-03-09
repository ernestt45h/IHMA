var axios = require('axios');
var hash = require('object-hash')
var url = axios.create({
    baseURL: 'https://client.teamcyst.com/api_call.php',
    headers: {
        'content-type': 'application/json',
        'App-Id': '32854bbb',
        'App-Key': 'abf8b76e7e56752e059fbd734b2d106b'
    }
});
var payee = {
    number: '0550997681',
    api_key: 'd79bb6a11048fd4ca6b05147ae92af9778f55d33',
}
/*
    {
        "price": 1,
        "network": "mtn",
        "recipient_number": "026xxxxxxx",
        "sender": "024xxxxxxx",
        "option": "rmta",
        "apikey": "",
        "orderID": ""
    }


price:	            The amount to be paid

network:	        This is the network of the mobile money account that would be making the 
                    payment (your customer).

recipient_number:	This is the mobile money account the payments shall end up in. (your account).

sender:             This is the mobile money account that would be making the payment (your customers).

option:	            This denotes the direction of cash flow. For example, rmta can be understood as an 
                    acronym of the phrase ‘receive mtn to airtel’, which means you would be receiving 
                    money to your Airtel account (the recipient number) from an MTN number(the sender). 
                    This format would hold for all transaction requests sent to the API. Do not forget to 
                    append the r at beginning.

apikey:	            The API key generated when you created the Mazzuma Business account. This can be 
                    accessed or changed via the web dashboard.

orderID:	        This optional parameter can be added to track the status of a transaction after it 
                    has been made. If supplied, it would be shown in your dashboard transaction table 
                    with the corresponding transaction. If not added, an order ID would be generated 
                    for you and can be accessed using the dashboard. Please note that the order ID is 
                    not the same as the transaction ID returned after a transaction request.

token:	            This is the token generated by Vodafone users in order to complete mobile money 
                    payments. This parameter is only required when the payment is to be made by a 
                    Vodafone user.

Sample Response

{
    "code":1,
    "status":"success",
    "id":"XXXXX"
}

Sending the request would bring up a confirmation and payment prompt on the mobile phone, 
after which the request would return a response. The request to the API would wait until the payment 
succeeds or fails, and return a JSON response.

The status denotes whether the transaction was successful or failed, and the id is the transaction ID.

In the event of a wrong request being sent, you would receive a response of Sorry Bro :(

In the event of the transaction failing, the request would terminate with an empty response.


?   Due to new regulations by MTN, users making payments using MTN would have to authorise the 
?   payments before they would be processed. We suggest that after sending your request, you 
?   prompt your MTN users to approve the payment before it would be processed. The steps your users 
?   would have to follow to authorise are as follows:

TODO    Dial *170#
TODO    Select option 10) Wallet
TODO    Select 3) My Approvals
TODO    Enter Mobile Money PIN
TODO    Select the transaction from the list
TODO    Confirm the transaction.
*/

module.exports = {

    payFromAirtel: function(number){
        return url.post('/', {
            "price": 1,
            "network": "airtel",
            "recipient_number": payee.number,
            "sender": number,
            "option": "ratm",
            "apikey": payee.api_key,
            "orderID": hash(number + new Date())
        })
        .then(function(result) {
            return result.data;
        }).catch(function(err){
            throw err;
        });
    },

    payFromMtn: function(number){
        return url.post('/', {
            "price": 1,
            "network": "mtn",
            "recipient_number": payee.number,
            "sender": number,
            "option": "rmtm",
            "apikey": payee.api_key,
            "orderID": hash(number + new Date())
        })
        .then(function(result) {
            return result.data;
        }).catch(function(err){
            throw err;
        });
    }

};


