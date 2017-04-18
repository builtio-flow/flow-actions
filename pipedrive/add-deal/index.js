var request = require ("request");

module.exports = function(){

    this.id = "pipedrive-deal-add";
    
    this.label = "Add Deal";

    this.input = {
        "title": "Add Deal",
        "type": "object",
        "properties": {
            "connection": {
                "title": "Connect to Pipedrive",
                "type": "string",
                "minLength": 1,
                "connection": "pipedrive",
                "propertyOrder": 1
            },
            "title": {
                "title": "Title",
                "type": "string",
                "minLength": 1,
                "description": "Deal title",
                "propertyOrder": 2
            },
            "value": {
                "title": "Value",
                "type": "string",
                "propertyOrder": 3,
                "description": "Enter value of the deal. If omitted, value will be set to 0"
            },
            "currency": {
                "title": "Currency",
                "type": "string",
                "propertyOrder": 4,
                "description": "Enter currency of the deal. Accepts a 3-character currency code. If omitted, currency will be set to the default currency of the authorized user"
            },
            "user_id": {
                "title": "User ID",
                "type": "string",
                "propertyOrder": 5,
                "description": "Enter id of the user who will be marked as the owner of this deal. If omitted, the authorized user ID will be used"
            },
            "person_id": {
                "title": "Person ID",
                "type": "string",
                "propertyOrder": 6,
                "description": "Enter id of the person this deal will be associated with"
            },
            "org_id": {
                "title": "Organization ID",
                "type": "string",
                "propertyOrder": 7,
                "description": "Enter id of the organization this deal will be associated with"
            },
            "stage_id": {
                "title": "Stage ID",
                "type": "string",
                "propertyOrder": 8,
                "description": "Enter id of the stage this deal will be placed in a pipeline (note that you can't supply the ID of the pipeline as this will be assigned automatically based on stage_id). If omitted, the deal will be placed in the first stage of the default pipeline"
            },
            "status": {
                "title": "Status",
                "type": "string",
                "enum": [
                    "Select",
                    "open",
                    "won",
                    "lost",
                    "deleted"
                ],
                "propertyOrder": 9,
                "description": "Select the status of the deal"
            },
            "lost_reason": {
                "title": "Lost Reason",
                "type": "string",
                "propertyOrder": 10,
                "description": "Optional message about why the deal was lost (to be used when status=lost)"
            },
            "add_time": {
                "title": "Add Time",
                "type": "string",
                "propertyOrder": 11,
                "description": "Optional creation date & time of the deal in ISO. Requires admin user API token. Format: yyyy-MM-ddTHH:mm:ssZ , eg: 2017-02-28T23:35:19.000Z"
            },
            "visible_to": {
                "title": "Visible To",
                "type": "number",
                "enum": [
                    0,
                    1,
                    3
                ],
                "propertyOrder": 12,
                "description": "0 - visibility will be set to the default 1 - Owner & followers (private) 3 - Entire company (shared)"
            }
        }
    };

    this.help = "Service to add new deal on pipedrive.";

    this.output = {
        "title":"output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "number",
                "displayTitle": "Deal ID"
            },
            "user_id": {
                "title": "user_id",
                "type": "number",
                "displayTitle": "User ID"
            },
            "person_id": {
                "title": "person_id",
                "type": "number",
                "displayTitle": "Person ID"
            },
            "org_id": {
                "title": "org_id",
                "type": "number",
                "displayTitle": "Organization ID"
            },
            "stage_id": {
                "title": "stage_id",
                "type": "number",
                "displayTitle": "Stage ID"
            },
            "title": {
                "title": "title",
                "type": "string",
                "displayTitle": "Title"
            },
            "value": {
                "title": "value",
                "type": "number",
                "displayTitle": "Value"
            },
            "currency": {
                "title": "currency",
                "type": "string",
                "displayTitle": "Currency"
            },
            "add_time": {
                "title": "add_time",
                "type": "string",
                "displayTitle": "Add Time"
            },
            "update_time": {
                "title": "update_time",
                "type": "string",
                "displayTitle": "Update Time"
            },
            "stage_change_time": {
                "title": "stage_change_time",
                "type": "string",
                "displayTitle": "Stage Change Time"
            },
            "active": {
                "title": "active",
                "type": "boolean",
                "displayTitle": "Is Active"
            },
            "deleted": {
                "title": "deleted",
                "type": "boolean",
                "displayTitle": "Is Deleted"
            },
            "status": {
                "title": "status",
                "type": "string",
                "displayTitle": "Status"
            },
            "next_activity_date": {
                "title": "next_activity_date",
                "type": "string",
                "displayTitle": "Next Activity Date"
            },
            "next_activity_time": {
                "title": "next_activity_time",
                "type": "string",
                "displayTitle": "Next Activity Time"
            },
            "next_activity_id": {
                "title": "next_activity_id",
                "type": "string",
                "displayTitle": "Next Activity ID"
            },
            "last_activity_id": {
                "title": "last_activity_id",
                "type": "string",
                "displayTitle": "Last Activity ID"
            },
            "last_activity_date": {
                "title": "last_activity_date",
                "type": "string",
                "displayTitle": "Last Activity Date"
            },
            "lost_reason": {
                "title": "lost_reason",
                "type": "string",
                "displayTitle": "Lost Reason"
            },
            "visible_to": {
                "title": "visible_to",
                "type": "string",
                "displayTitle": "Visible To"
            },
            "close_time": {
                "title": "close_time",
                "type": "string",
                "displayTitle": "Close Time"
            },
            "pipeline_id": {
                "title": "pipeline_id",
                "type": "number",
                "displayTitle": "Pipeline ID"
            },
            "won_time": {
                "title": "won_time",
                "type": "string",
                "displayTitle": "Won Time"
            },
            "lost_time": {
                "title": "lost_time",
                "type": "string",
                "displayTitle": "Lost Time"
            },
            "products_count": {
                "title": "products_count",
                "type": "string",
                "displayTitle": "Products Count"
            },
            "files_count": {
                "title": "files_count",
                "type": "string",
                "displayTitle": "Files Count"
            },
            "notes_count": {
                "title": "notes_count",
                "type": "number",
                "displayTitle": "Notes Count"
            },
            "followers_count": {
                "title": "followers_count",
                "type": "number",
                "displayTitle": "Followers Count"
            },
            "email_messages_count": {
                "title": "email_messages_count",
                "type": "string",
                "displayTitle": "Email Message Count"
            },
            "activities_count": {
                "title": "activities_count",
                "type": "string",
                "displayTitle": "Activities Count"
            },
            "done_activities_count": {
                "title": "done_activities_count",
                "type": "string",
                "displayTitle": "Done Activities Count"
            },
            "undone_activities_count": {
                "title": "undone_activities_count",
                "type": "string",
                "displayTitle": "Undone Activities Count"
            },
            "reference_activities_count": {
                "title": "reference_activities_count",
                "type": "string",
                "displayTitle": "Reference Activities Count"
            },
            "participants_count": {
                "title": "participants_count",
                "type": "number",
                "displayTitle": "Participants Count"
            },
            "expected_close_date": {
                "title": "expected_close_date",
                "type": "string",
                "displayTitle": "Expected Close Date"
            },
            "stage_order_nr": {
                "title": "stage_order_nr",
                "type": "number",
                "displayTitle": "Stage Order"
            },
            "person_name": {
                "title": "person_name",
                "type": "string",
                "displayTitle": "Person Name"
            },
            "org_name": {
                "title": "org_name",
                "type": "string",
                "displayTitle": "Organization Name"
            },
            "next_activity_subject": {
                "title": "next_activity_subject",
                "type": "string",
                "displayTitle": "Next Activity Subject"
            },
            "next_activity_type": {
                "title": "next_activity_type",
                "type": "string",
                "displayTitle": "Next Activity Type"
            },
            "next_activity_duration": {
                "title": "next_activity_duration",
                "type": "string",
                "displayTitle": "Next Activity Duration"
            },
            "next_activity_note": {
                "title": "next_activity_note",
                "type": "string",
                "displayTitle": "Next Activity Note"
            },
            "formatted_value": {
                "title": "formatted_value",
                "type": "string",
                "displayTitle": "Formatted Value"
            },
            "weighted_value": {
                "title": "weighted_value",
                "type": "number",
                "displayTitle": "Weighted Value"
            },
            "formatted_weighted_value": {
                "title": "formatted_weighted_value",
                "type": "string",
                "displayTitle": "Formatted Weighted Value"
            },
            "rotten_time": {
                "title": "rotten_time",
                "type": "string",
                "displayTitle": "Rotten Time"
            },
            "owner_name": {
                "title": "owner_name",
                "type": "string",
                "displayTitle": "Owner Name"
            },
            "cc_email": {
                "title": "cc_email",
                "type": "string",
                "displayTitle": "Email CC"
            },
            "org_hidden": {
                "title": "org_hidden",
                "type": "boolean",
                "displayTitle": "Is Organization Hidden"
            },
            "person_hidden": {
                "title": "person_hidden",
                "type": "boolean",
                "displayTitle": "Is Person Hidden"
            }
        }
    };

    this.execute = function(input, output){
        var body = {
            title : input.title
        };
        if(input.user_id){
            if(isNaN(input.user_id)){
                return output("User ID must be an integer");
            }
            input.user_id = Number(input.user_id);
        }
        if(input.person_id){
            if(isNaN(input.person_id)){
                return output("Person ID must be an integer");
            }
            input.person_id = Number(input.person_id);
        }
        if(input.org_id){
            if(isNaN(input.org_id)){
                return output("Organization ID must be an integer");
            }
            input.org_id = Number(input.org_id);
        }
        if(input.stage_id){
            if(isNaN(input.stage_id)){
                return output("Stage ID must be an integer");
            }
            input.stage_id = Number(input.stage_id);
        }
        if(input.value){
            if(isNaN(input.value)){
                return output( "value must be an integer");
            }
            input.value = Number(input.value);
        }
        if(input.visible_to != 0){
            body.visible_to = input.visible_to;
        }
        if(input.visible_to == 'Owner and followers'){
            body.visible_to = 1;
        }
        if(input.visible_to == 'Entire company'){
            body.visible_to = 3;
        }
        if(input.status.match(/^open|won|lost|deleted$/g)){
            body.status = input.status;
        }

        if(input.add_time){
            var pattern = /^\d{4}-\d{1,2}-\d{1,2}\T\d{1,2}:\d{1,2}:\d{1,2}.\d{1,3}\Z+$/.test(input.add_time);
            if(pattern == false){
                return output("Add Time is invalid format");
            }else {
                body.add_time = input.add_time;
            }
        }
        optField(input,'user_id',body);
        optField(input,'person_id',body);
        optField(input,'org_id',body);
        optField(input,'stage_id',body);
        optField(input,'value',body);
        optField(input,'currency',body);
        optField(input,'lost_reason',body);

        
        request({
            method:"POST",
            url:"https://api.pipedrive.com/v1/deals"+'?api_token='+input.connection.access_token,
            header:{
                "Content-Type":"application/json"
            },
            json:body
        },function(error,response,body){
            if(error){
                return output (error);
            }
            if(response && response.statusCode === 403){
                if(body && body.success === false){
                    return output("You do not have permissions to do this.");
                }
            }
            if(response && response.statusCode === 400){
                if(body && body.success === false){
                    return output("Stage ID is Invalid");
                }
            }
            if (response.statusCode >= 200 && response.statusCode < 400) {
                if (typeof(body) === 'string') {
                    try{
                        body = JSON.parse(body);
                    }catch(error){
                        return output(body);
                    }
                }
                return output(null,body.data);
            }
            output(body.data);
        });
    }
};

function optField(src,val,trgt){
    if(src[val]){
        trgt[val] = src[val];
    }
}

