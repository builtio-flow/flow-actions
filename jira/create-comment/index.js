
var request = require("request");

module.exports = function() {
   
    this.id = "jira-comment-create";
   
    this.label = "Create Comment";

    this.input = {
        "title": "Create Comment",
        "type": "object",
        "properties": {
            "connection": {
                "title": "Connect to Jira",
                "type": "string",
                "minLength": 1,
                "connection": "jira"
            },
            "issue_id": {
                "title": "Issue ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter issue id"
            },
            "body": {
                "title": "Comment",
                "type": "string",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter your comment"
            }
        }
    };

    this.help = "Service to create a comment for issue";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "self": {
                "title": "self",
                "type": "string",
                "displayTitle": "Self"
            },
            "id": {
                "title": "id",
                "type": "string",
                "displayTitle": "ID"
            },
            "author": {
                "title": "author",
                "type": "object",
                "properties": {
                    "name": {
                        "title": "name",
                        "type": "string",
                        "displayTitle": "Author Name"
                    },
                    "emailAddress": {
                        "title": "emailAddress",
                        "type": "string",
                        "displayTitle": "Author Email Address"
                    },
                    "displayName": {
                        "title": "displayName",
                        "type": "string",
                        "displayTitle": "Author Display Name"
                    },
                    "active": {
                        "title": "active",
                        "type": "boolean",
                        "displayTitle": "Author Active"
                    },
                    "timeZone": {
                        "title": "timeZone",
                        "type": "string",
                        "displayTitle": "Author Time Zone"
                    }
                },
                "displayTitle": "Author"
            },
            "body": {
                "title": "body",
                "type": "string",
                "displayTitle": "Body"
            },
            "updateAuthor": {
                "title": "updateAuthor",
                "type": "object",
                "properties": {
                    "name": {
                        "title": "name",
                        "type": "string",
                        "displayTitle": "Update Author Name"
                    },
                    "emailAddress": {
                        "title": "emailAddress",
                        "type": "string",
                        "displayTitle": "Update Author Email Address"
                    },
                    "displayName": {
                        "title": "displayName",
                        "type": "string",
                        "displayTitle": "Update Author Display Name"
                    },
                    "active": {
                        "title": "active",
                        "type": "boolean",
                        "displayTitle": "Update Author Active"
                    },
                    "timeZone": {
                        "title": "timeZone",
                        "type": "string",
                        "displayTitle": "Update Author Time Zone"
                    }
                },
                "displayTitle": "Update Author"
            },
            "created": {
                "title": "created",
                "type": "string",
                "displayTitle": "Created At"
            },
            "updated": {
                "title": "updated",
                "type": "string",
                "displayTitle": "Updated At"
            }
        }
    };

    this.execute = function(input, output) {
        
        var jsonData = {
            body :    input.body
        };

        request({
            headers: {
                "content-type": "application/json"
            },
            auth: {
                "user": input.connection.user_name,
                "pass": input.connection.password
            },
            url: input.connection.project_url + "/rest/api/2/issue/" + input.issue_id + "/comment",
            method: "POST",
            json: jsonData
        }, function(err, response, body) {

            if (err) {
                return output(err);
            }

            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 204) {
                if (typeof(body) == "string") {
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(null, body);
        });
    }
};