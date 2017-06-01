var request = require('request');

module.exports = function() {

    this.id = "slack-public-channel-create";

    this.label = "Create Public Channel";

    this.input = {
        "title": "Create Public Channel",
        "type": "object",
        "properties": {
            "auth": {
                "title": "Authorize Slack",
                "type": "string",
                "oauth": "slack",
                "minLength": 1,
                "propertyOrder": 1
            },
            "name": {
                "title": "Channel Name",
                "type": "string",
                "description": "Name of channel to create",
                "minLength": 1,
                "propertyOrder": 2
            },
            "validate": {
                "title": "Validate Channel Name",
                "type": "boolean",
                "default": false,
                "description": "Whether to return errors on invalid channel name instead of modifying it to meet the specified criteria",
                "propertyOrder": 3
            }
        }
    };

    this.help = "Service to create new public channel on slack";

    this.output = {
        "type": "object",
        "properties": {
            "ok": {
                "type": "boolean",
                "title": "ok",
                "displayTitle": "Status"
            },
            "channel": {
                "type": "object",
                "title": "channel",
                "displayTitle": "Channel",
                "properties": {
                    "id": {
                        "type": "string",
                        "title": "id",
                        "displayTitle": "Channel ID"
                    },
                    "name": {
                        "type": "string",
                        "title": "name",
                        "displayTitle": "Name"
                    },
                    "created": {
                        "type": "string",
                        "title": "created",
                        "displayTitle": "Created"
                    },
                    "creator": {
                        "type": "string",
                        "title": "creator",
                        "displayTitle": "Creator"
                    },
                    "is_archived": {
                        "type": "boolean",
                        "title": "is_archived",
                        "displayTitle": "Is Archived"
                    },
                    "is_member": {
                        "type": "boolean",
                        "title": "is_member",
                        "displayTitle": "Is Member"
                    },
                    "is_general": {
                        "type": "boolean",
                        "title": "is_general",
                        "displayTitle": "Is General"
                    },
                    "last_read": {
                        "type": "string",
                        "title": "last_read",
                        "displayTitle": "Last Read"
                    },
                    "latest": {
                        "type": "string",
                        "title": "latest",
                        "displayTitle": "Latest"
                    },
                    "unread_count": {
                        "type": "string",
                        "title": "unread_count",
                        "displayTitle": "Unread Count"
                    },
                    "unread_count_display": {
                        "type": "string",
                        "title": "unread_count_display",
                        "displayTitle": "Unread Count Display"
                    },
                    "members": {
                        "type": "array",
                        "title": "members",
                        "displayTitle": "Members",
                        "items": {
                            "type": "string"
                        }
                    },
                    "topic": {
                        "type": "object",
                        "title": "topic",
                        "displayTitle": "Channel Topic",
                        "properties": {
                            "value": {
                                "type": "string",
                                "title": "value",
                                "displayTitle": "Channel Topic Value"
                            },
                            "creator": {
                                "type": "string",
                                "title": "creator",
                                "displayTitle": "Channel Topic Creator"
                            },
                            "last_set": {
                                "type": "string",
                                "title": "last_set",
                                "displayTitle": "Channel Topic Last Set"
                            }
                        }
                    },
                    "purpose": {
                        "type": "object",
                        "title": "purpose",
                        "displayTitle": "Channel Purpose",
                        "properties": {
                            "value": {
                                "type": "string",
                                "title": "value",
                                "displayTitle": "Purpose Value"
                            },
                            "creator": {
                                "type": "string",
                                "title": "creator",
                                "displayTitle": "Purpose Creator"
                            },
                            "last_set": {
                                "type": "string",
                                "title": "last_set",
                                "displayTitle": "Purpose Last Set"
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {
        var body = {
            "token": input.auth,
            "name": input.name.trim(),
            "validate": input.validate
        };

        var options = {
            "method": "POST",
            "url": "https://slack.com/api/channels.create",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "form": body
        };

        request(options, function(error, response, body) {
            if(error) {
                return output(error);
            }
            try {
                if(body && typeof (body) === "string") {
                    body = JSON.parse(body);
                }
            } catch(e) {
                return output(e);
            }
            if(response && response.statusCode === 200 && !body.ok) {
                return output(body.detail || body.error);
            }
            if(response && response.statusCode === 200 && body.ok) {
                return output(null, body);
            }
            output(body);
        });
    }
};