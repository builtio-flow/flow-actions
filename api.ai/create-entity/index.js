var request = require("request");

module.exports = function() {
    this.id = "apiai-entity-create";

    this.label = "Create Entity";

    this.input = {
        "title": "Create Entity",
        "type": "object",
        "properties": {
            "connection": {
                "title": "Connect to Api.ai",
                "type": "string",
                "connection": "apiai2",
                "minLength": 1,
                "propertyOrder": 1
            },
            "name": {
                "title": "Name",
                "type": "string",
                "description": "Entity name may contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash) with out any spaces",
                "minLength": 1,
                "propertyOrder": 2
            },
            "entries": {
                "title": "Entries",
                "type": "array",
                "propertyOrder": 3,
                "items": {
                    "title": "Entry",
                    "type": "object",
                    "properties": {
                        "value": {
                            "title": "Reference Value",
                            "type": "string",
                            "description": "Enter reference value"
                        },
                        "synonyms": {
                            "title": "Synonym",
                            "type": "string",
                            "description": "Enter synonyms separated by comma"
                        }
                    }

                }
            }
        }
    };

    this.help = "Service to create single entity on Api.ai";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "title": "id",
                "displayTitle": "Entity ID"
            },
            "status": {
                "type": "object",
                "title": "status",
                "displayTitle": "Entity Status Info",
                "properties": {
                    "code": {
                        "type": "number",
                        "title": "code",
                        "displayTitle": "Status Code"
                    },
                    "errorType": {
                        "type": "string",
                        "title": "errorType",
                        "displayTitle": "Status Error Type"
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {
        var obj = {
            "name": input.name
        };
        if (input.entries && input.entries.length > 0) {
            input.entries.forEach(function(item, index) {
                item.synonyms = item.synonyms.split(",");
            });
            obj.entries = input.entries;
        }
        var options = {
            "method": "post",
            "url": "https://api.api.ai/v1/entities?v=20150910",
            "headers": {
                "x-li-format": "json",
                "Accept": "application/json",
                "Authorization": "Bearer " + input.connection.access_token
            },
            "json": obj
        }
        request(options, function(err, response, body) {
            if (err) {
                return output(err);
            }
            try {
                if (body && typeof(body) === "string") {
                    body = JSON.parse(body);
                }
            } catch (e) {
                return output(body);
            }
            if (response.statusCode === 401) {
                return output("Invalid access token");
            }
            if (response.statusCode !== 200) {
                return output(body.status.errorDetails);
            }
            if (response.statusCode === 200) {
                return output(null, body);
            }
            output(body);

        })
    }
}