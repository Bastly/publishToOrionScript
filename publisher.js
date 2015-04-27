var request = require('request');
var _ = require('underscore');
var IP_ORION = 'orion.bastly.com';
var PORT_ORION = '1026';

request.post({
    url: 'http://' + IP_ORION + ":" + PORT_ORION + '/v1/updateContext',
    json: true, 
    body: {
        "contextElements": [
        {
            "type": "BastlyMSG",
            "isPattern": "false",
            "id": "BastlyKey:1234:userId:office1",
            "attributes": [
            {
                "name": "temperature:Kitchen",
                "type": "float",
                "value": "21.4"
            },
            {
                "name": "temperature:Entrance",
                "type": "float",
                "value": "23.4"
            },
            {
                "name": "temperature:MeetingRoom",
                "type": "float",
                "value": "20.4"
            },
            {
                "name": "channels",
                "type": "float",
                "value": ["testOffice"]
            }
            ]
        }
        ],
        "updateAction": "APPEND"
    }
},
function (error, response, body) {
    if (error) console.log(error);
    console.log(body);
});

setInterval(function () {
    request.post({
        url: 'http://' + IP_ORION + ":" + PORT_ORION + '/v1/updateContext',
        json: true, 
        body: {
            "contextElements": [
            {
                "type": "BastlyMSG",
                "isPattern": "false",
                "id": "BastlyKey:1234:userId:office1",
                "attributes": [
                {
                    "name": "temperature:Kitchen",
                    "type": "float",
                    "value": random(0, 100).toFixed(2)
                },
                {
                    "name": "temperature:Entrance",
                    "type": "float",
                    "value": random(0, 100).toFixed(2)
                },
                {
                    "name": "temperature:MeetingRoom",
                    "type": "float",
                    "value": random(0, 100).toFixed(2)
                },
                {
                    "name": "channels",
                    "type": "float",
                    "value": ["testOffice"]
                }
                ]
            }
            ],
            "updateAction": "UPDATE"
        }
    },
    function (error, response, body) {
        console.log(body);
    });
}, 1000);

function random (low, high) {
    return Math.random() * (high - low) + low;
}