var request = require("request");

module.exports = function() {

    this.id = "intercom-note-create";
    
    this.label = "Create Note";

    this.input = {
        "title": "Create Note",
        "type": "object",
        "properties": {
            "connection": {
                "type": "string",
                "title": "Connect to Intercom",
                "minLength": 1,
                "connection": "intercom"
            },
            "user": {
                "type": "object",
                "title": "User",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "title": "User ID",
                        "description": "The user ID of the user the note is created about",
                        "minLength": 1
                    }
                }
            },
            "body": {
                "type": "string",
                "title": "Body",
                "description": "Body of the message. May contain HTML",
                "format": "textarea",
                "minLength": 1
            }
        }
    };

    this.help = "Creates A Note";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "type": {
                "type": "string",
                "title": "type",
                "displayTitle": "Type"
            },
            "id": {
                "type": "string",
                "title": "id",
                "displayTitle": "ID"
            },
            "created_at": {
                "type": "number",
                "title": "created_at",
                "displayTitle": "Created At"
            },
            "body": {
                "type": "string",
                "title": "body",
                "displayTitle": "Body"
            },
            "author": {
                "type": "object",
                "title": "author",
                "properties": {
                    "type": {
                        "type": "string",
                        "title": "type",
                        "displayTitle": "Author Type"
                    },
                    "id": {
                        "type": "string",
                        "title": "id",
                        "displayTitle": "Author ID"
                    },
                    "name": {
                        "type": "string",
                        "title": "name",
                        "displayTitle": "Author Name"
                    },
                    "email": {
                        "type": "string",
                        "title": "email",
                        "displayTitle": "Author Email"
                    },
                    "companies": {
                        "type": "array",
                        "title": "companies",
                        "items": {
                            "type": "object"
                        },
                        "displayTitle": "Author Companies"
                    },
                    "user": {
                        "type": "object",
                        "title": "user",
                        "properties": {
                            "type": {
                                "type": "string",
                                "title": "type",
                                "displayTitle": "User Type"
                            },
                            "id": {
                                "type": "string",
                                "title": "id",
                                "displayTitle": "User ID"
                            }
                        },
                        "displayTitle": "Author User"
                    }
                },
                "displayTitle": "Author"
            }
        }
    };

    this.execute = function(input, output) {
        var params = {
            user : input.user,
            body : input.body
        };

        if (input.author){
            params.author = input.author;
        }
            
        request({
            url: "https://api.intercom.io/notes",
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            json: params,
            auth: {
                "user"  : String(input.connection.app_id).trim(),
                "pass"  : String(input.connection.api_secret).trim()
            }
        }, function(err, res, body) {
            if (err){
                return output(body);
            }            
            switch (res.statusCode) {
                case 200:
                    if (typeof(body) == "string"){
                        body = JSON.parse(body);
                    }                       
                    return output(null, body);
                default:
                    return output(body);
            }
        });
    }
}