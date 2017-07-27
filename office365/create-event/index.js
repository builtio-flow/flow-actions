var request = require("request");

module.exports = function() {
    this.id = "office365-event-create";
    this.label = "Create Event";

    this.input = {
        "title": "Create Calendar Event",
        "type": "object",
        "properties": {
            "auth": {
                "title": "Authorize Office 365",
                "type": "string",
                "oauth": "microsoft_365",
                "minLength": 1,
                "propertyOrder": 1
            },
            "calendar_id": {
                "title": "Calendar ID",
                "type": "string",
                "description": "Select Calender ID",
                "propertyOrder": 2,
                "minLength": 1,
                "lookup": {
                    "service": "microsoft365",
                    "id": "m2",
                    "auth": "oauth",
                    "enabled": true,
                    "dependencies": [
                        "auth"
                    ]
                }
            },
            "subject": {
                "title": "Event Title",
                "type": "string",
                "description": "Provide a title for the event",
                "propertyOrder": 3,
                "minLength": 1
            },
            "start_dateTime": {
                "title": "Event Start",
                "type": "string",
                "description": "Specify the date from the  event start",
                "format": "datetime",
                "minLength": 1,
                "propertyOrder": 4
            },
            "end_dateTime": {
                "title": "Event End",
                "type": "string",
                "description": "Specify the date from the  event end",
                "format": "datetime",
                "minLength": 1,
                "propertyOrder": 5
            },
            "timeZone": {
                "title": "Time Zone",
                "propertyOrder": 6,
                "type": "string",
                "description": "Enter the time zone for event E.g., Asia/Kolkata",
                "minLength": 1,
                "lookup": {
                    "id": "t1",
                    "service": "timezone",
                    "enabled": true
                }
            },
            "body": {
                "title": "Event Description",
                "propertyOrder": 6,
                "type": "object",
                "properties": {
                    "contentType": {
                        "title": "Format",
                        "type": "string",
                        "enum": [
                            "Text",
                            "HTML"
                        ],
                        "description": "Select the format of the event description"
                    },
                    "content": {
                        "title": "Description",
                        "type": "string",
                        "format": "textarea",
                        "description": "Enter the description for the event"
                    }
                }
            },
            "location": {
                "title": "Event Location",
                "propertyOrder": 7,
                "type": "object",
                "properties": {
                    "displayName": {
                        "title": "Location Name",
                        "type": "string",
                        "description": "Enter the name of the location"
                    },
                    "address": {
                        "title": "Event Address",
                        "type": "object",
                        "properties": {
                            "street": {
                                "title": "Street",
                                "type": "string",
                                "description": "Enter event street"
                            },
                            "city": {
                                "title": "City",
                                "type": "string",
                                "description": "Enter event city"
                            },
                            "state": {
                                "title": "State",
                                "type": "string",
                                "description": "Enter event state"
                            },
                            "postalCode": {
                                "title": "Postal Code",
                                "type": "string",
                                "description": "Enter event postal code"
                            },
                            "countryOrRegion": {
                                "title": "Country",
                                "type": "string",
                                "description": "Enter event country"
                            }
                        }
                    }
                }
            },
            "attendees": {
                "title": "Attendees",
                "propertyOrder": 8,
                "type": "array",
                "items": {
                    "title": "Attendee",
                    "type": "object",
                    "properties": {
                        "email": {
                            "title": "Email Address",
                            "type": "string",
                            "description": "Enter the email ID of the attendee",
                            "minLength": 1
                        },
                        "name": {
                            "title": "Name",
                            "type": "string",
                            "description": "Enter the name of the attendee",
                            "minLength": 1
                        },
                        "type": {
                            "title": "Attendee Type",
                            "type": "string",
                            "minLength": 1,
                            "enum": [
                                "Required",
                                "Optional",
                                "Resource"
                            ],
                            "description": "Select the type of attendee"
                        }
                    }
                }
            },
            "additional_params": {
                "title": "Additional Parameters",
                "type": "array",
                "propertyOrder": 9,
                "items": {
                    "type": "object",
                    "title": "Parameter",
                    "properties": {
                        "param_name": {
                            "title": "Name",
                            "type": "string",
                            "description": "Provide the name of the parameter that you wish to add"
                        },
                        "param_value": {
                            "title": "Value",
                            "type": "string",
                            "description": "Enter value for parameter"
                        }
                    }
                }
            }
        }
    };
    this.help = "Service to create event"
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "string",
                "displayTitle": "Event ID"
            },
            "createdDateTime": {
                "title": "createdDateTime",
                "type": "string",
                "displayTitle": "Created Date Time"
            },
            "lastModifiedDateTime": {
                "title": "lastModifiedDateTime",
                "type": "string",
                "displayTitle": "Last Modified Date Time"
            },
            "changeKey": {
                "title": "changeKey",
                "type": "string"
            },
            "originalStartTimeZone": {
                "title": "originalStartTimeZone",
                "type": "string",
                "displayTitle": "Original Start TimeZone"
            },
            "originalEndTimeZone": {
                "title": "originalEndTimeZone",
                "type": "string",
                "displayTitle": "Original End TimeZone"
            },
            "iCalUId": {
                "title": "iCalUId",
                "type": "string",
                "displayTitle": "Calendar ID"
            },
            "reminderMinutesBeforeStart": {
                "title": "reminderMinutesBeforeStart",
                "type": "string",
                "displayTitle": "Reminder Minutes"
            },
            "isReminderOn": {
                "title": "isReminderOn",
                "type": "boolean",
                "displayTitle": "Is Reminder On"
            },
            "hasAttachments": {
                "title": "hasAttachments",
                "type": "boolean"
            },
            "subject": {
                "title": "subject",
                "type": "string",
                "displayTitle": "Event Title"
            },
            "body": {
                "title": "body",
                "type": "object",
                "properties": {
                    "contentType": {
                        "title": "contentType",
                        "type": "string",
                        "displayTitle": "Content Type"
                    },
                    "content": {
                        "title": "content",
                        "type": "string",
                        "displayTitle": "Event Description"
                    }
                },
                "displayTitle": "Event Content"
            },
            "bodyPreview": {
                "title": "bodyPreview",
                "type": "string",
                "displayTitle": "Description"
            },
            "importance": {
                "title": "importance",
                "type": "string",
                "displayTitle": "Event Importance"
            },
            "sensitivity": {
                "title": "sensitivity",
                "type": "string",
                "displayTitle": "Event Sensitivity"
            },
            "start": {
                "type": "object",
                "title": "start",
                "properties": {
                    "dateTime": {
                        "type": "string",
                        "title": "dateTime",
                        "displayTitle": "Date Time"
                    },
                    "timeZone": {
                        "type": "string",
                        "title": "timeZone",
                        "displayTitle": "Time Zone"
                    }
                },
                "displayTitle": "Event Start"
            },
            "end": {
                "type": "object",
                "title": "end",
                "properties": {
                    "dateTime": {
                        "type": "string",
                        "title": "dateTime",
                        "displayTitle": "Date Time"
                    },
                    "timeZone": {
                        "type": "string",
                        "title": "timeZone",
                        "displayTitle": "Time Zone"
                    }
                },
                "displayTitle": "Event End"
            },
            "location": {
                "type": "object",
                "title": "location",
                "properties": {
                    "displayName": {
                        "type": "string",
                        "title": "displayName"
                    },
                    "address": {
                        "title": "address",
                        "type": "object",
                        "properties": {
                            "street": {
                                "title": "street",
                                "type": "string",
                                "displayTitle": "Street"
                            },
                            "city": {
                                "title": "city",
                                "type": "string",
                                "displayTitle": "City"
                            },
                            "state": {
                                "title": "state",
                                "type": "string",
                                "displayTitle": "State"
                            },
                            "countryOrRegion": {
                                "title": "countryOrRegion",
                                "type": "string",
                                "displayTitle": "Country"
                            },
                            "postalCode": {
                                "title": "postalCode",
                                "type": "string",
                                "displayTitle": "Postal Code"
                            }
                        },
                        "displayTitle": "Address"
                    }
                },
                "displayTitle": "Event Location"
            },
            "isAllDay": {
                "title": "isAllDay",
                "type": "boolean",
                "displayTitle": "Is All Day Event"
            },
            "isCancelled": {
                "title": "isCancelled",
                "type": "boolean",
                "displayTitle": "IsCancelled Event"
            },
            "isOrganizer": {
                "title": "isOrganizer",
                "type": "boolean",
                "displayTitle": "Is Organizer"
            },
            "showAs": {
                "title": "showAs",
                "type": "string"
            },
            "responseRequested": {
                "title": "responseRequested",
                "type": "boolean"
            },
            "type": {
                "title": "type",
                "type": "string"
            },
            "attendees": {
                "type": "array",
                "title": "attendees",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "title": "type",
                            "type": "string",
                            "displayTitle": "Attendee Type"
                        },
                        "response_status": {
                            "title": "response_status",
                            "type": "string",
                            "displayTitle": "Response Status"
                        },
                        "name": {
                            "title": "name",
                            "type": "string",
                            "displayTitle": "Attendee Name"
                        },
                        "email": {
                            "title": "email",
                            "type": "string",
                            "displayTitle": "Attendee Email"
                        }
                    }
                }
            },
            "webLink": {
                "title": "webLink",
                "type": "string",
                "displayTitle": "Web Link"
            },
            "organizer_name": {
                "title": "organizer_name",
                "type": "string",
                "displayTitle": "Organizer Name"
            },
            "organizer_email": {
                "title": "organizer_email",
                "type": "string",
                "displayTitle": "Organizer Email"
            }
        }
    };
    this.execute = function(input, output) {
        var me = this;
        input.start = {
            "dateTime": input.start_dateTime,
            "timeZone": input.timeZone
        };
        input.end = {
            "dateTime": input.end_dateTime,
            "timeZone": input.timeZone
        };
        input.start.dateTime = checkDate(input.start.dateTime)
        if (input.start && !input.start.dateTime) {
            return output("Event start date is not valid");
        }
        input.end.dateTime = checkDate(input.end.dateTime)
        if (input.end && !input.end.dateTime) {
            return output("Event end date is not valid");
        }
        var enddateIsgreater = endDateISGreater(input.start.dateTime, input.end.dateTime)
        if (!enddateIsgreater) {
            return output("End date of event should be greater then or equal to start date")
        }
        var formData = {
            "subject": input.subject,
            "start": input.start,
            "end": input.end
        };
        optField("body", input.body, formData);
        optField("location", input.location, formData)
        var attendee = optField("attendees", input.attendees, formData)
        if (attendee === false) {
            return output("email address of attendee is not valid");
        }
        formData = me.$helper.mergeExtraParams(input, formData);
        request({
            headers: {
                "Authorization": "Bearer " + input.auth,
                "accept": "application/json",
            },
            url: "https://graph.microsoft.com/v1.0/me/calendars/" + input.calendar_id + "/events",
            method: "POST",
            json: formData
        }, callback)

        function callback(err, response, body) {
            if (err) {
                return output(err);
            }
            if (typeof body == "string") {
                try {
                    body = JSON.parse(body);

                } catch (e) {
                    return output(e)
                }
            }
            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                body = formatData(body)
                return output(null, body);
            } else {
                if (body.error && body.error.message == "Id is malformed.") {
                    return output("Calender id is not valid")
                }
                return output(body);
            }
        }
    };
}

function formatData(body) {
    delete body["@odata.context"];
    delete body["@odata.etag"]
    for (var i = 0; i < body.attendees.length; i++) {
        body.attendees[i]["response_status"] = body.attendees[i].status.response
        body.attendees[i]["name"] = body.attendees[i].emailAddress.name
        body.attendees[i]["email"] = body.attendees[i].emailAddress.address
        delete body.attendees[i].status
        delete body.attendees[i].emailAddress
    }
    body["organizer_name"] = body.organizer.emailAddress.name
    body["organizer_email"] = body.organizer.emailAddress.address
    delete body["organizer"];
    delete body["responseStatus"];
    return body
}

function checkEmail(email) {
    if (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

function optField(title, value, dest) {
    var event_attendees = [];
    if (Array.isArray(value) && value.length > 0) {
        for (var i = 0; i < value.length; i++) {
            if (value[i].email) {
                var inValid_email = checkEmail(value[i].email);
                if (!inValid_email) {
                    return false;
                }
            }
            event_attendees.push({
                "emailAddress": {
                    "address": value[i].email,
                    "name": value[i].name
                },
                "type": value[i].type
            });
        }
        dest[title] = event_attendees;
    } else
    if (typeof(value) == "string") {
        dest[title] = value
    } else {
        if (!Array.isArray(value) && typeof(value) == "object") {
            for (pro in value) {
                if (pro == "content" || pro == "displayName") {
                    dest[title] = value
                }
            }
        }
    }
}

function checkDate(date) {
    var d = new Date(date)
    if (d == "Invalid Date") {
        return false
    } else {
        return date;
    }
}

function endDateISGreater(start, end) {
    try {
        var s = Number(new Date(start))
        var e = Number(new Date(end))
        if (e >= s) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}