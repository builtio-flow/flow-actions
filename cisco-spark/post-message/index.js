var request = require('request');

module.exports = function () {

    this.id = "spark-post-message";

    this.label = "Post New Message";

    this.input = {
        "title": "Post New Message",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Authorize Cisco Spark",
                "oauth": "spark_admin",
                "minLength": 1
            },
            "roomId": {
                "type": "string",
                "title": "Room ID",
                "description": "Enter the room ID",
                "minLength": 1,
                "lookup": {
                    "id": "s1",
                    "service": "spark",
                    "auth": "oauth",
                    "enabled": true,
                    "searchable": true,
                    "dependencies": [
                        "access_token"
                    ]
                }
            },
            "messageType": {
                "type": "string",
                "title": "Message Type",
                "enum": [
                    "Text",
                    "Markdown"
                ],
                "minLength": 1
            },
            "text": {
                "type": "string",
                "title": "Message",
                "format": "textarea",
                "description": "Message to post to the room",
                "minLength": 1
            }
        }
    };

    this.help = "This activity post new message in specified room of your spark account";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "title": "id"
            },
            "roomId": {
                "type": "string",
                "title": "roomId"
            },
            "personId": {
                "type": "string",
                "title": "personId"
            },
            "personEmail": {
                "type": "string",
                "title": "personEmail"
            },
            "created": {
                "type": "string",
                "title": "created"
            },
            "text": {
                "type": "string",
                "title": "text"
            }
        }
    };

    this.execute = function (input, output) {

        var opt = {
            url: "https://api.ciscospark.com/v1/messages",
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type" : "application/json;charset=utf-8"
            },
            json : {
                "roomId": input.roomId
            }
        };

        if (input.text && typeof(input.text) === "object") {
            input.text = JSON.stringify(input.text);
        }


        if (input.messageType === "Text") {
            opt.json.text = input.text;
        } else {
            opt.json.markdown = input.text;
        }


        request(opt, function (err, res, body) {

            if (err) {
                return output(err);
            }

            if (res.statusCode == 401) {
                return output("Your access token is Invalid or Expired");
            }

            if (res.statusCode === 200) {
                return output(null, body);
            }

            return output(body);
        });

    };
};
