var request = require("request");

module.exports = function(){
    
    this.id = "google-sheet-rows-get";
    
    this.label = "Get Rows";
    
    this.input = {
        "title": "Get Rows",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Authorize Google Sheet",
                "type": "string",
                "oauth": "google_sheet",
                "minLength": 1
            },
            "spreadsheet_id": {
                "title": "Spreadsheet ID/Name",
                "type": "string",
                "description": "Specify ID of the spreadsheet",
                "minLength": 1
            },
            "sheet": {
                "title": "Sheet ID/Name",
                "type": "string",
                "description": "Specify Name/ID of the sheet",
                "minLength": 1
            },
            "from_row": {
                "title": "From Row",
                "type": "string",
                "description": "Return data from specific row using A1 notation. For example: A1"
            },
            "to_row": {
                "title": "To Row",
                "type": "string",
                "description": "Enter the row up to which you wish to continue the retriive operation. For example: Z1"
            }
        }
    };

    this.help = "Service to get sheet rows"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "range": {
                "title": "range",
                "type": "string",
                "displayTitle": "Sheet Range"
            },
            "majorDimension": {
                "title": "majorDimension",
                "type": "string",
                "displayTitle": "Major Dimension"
            },
            "values": {
                "title": "values",
                "type": "array",
                "displayTitle": "Row Values",
                "items": {
                    "type": "array",
                    "items": { }
                }
            }
        }
    };

    this.execute = function(input,output){

        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + input.spreadsheet_id + "/values/"+input.sheet
        
        if(input.from_row && input.to_row){
            url += "!"+input.from_row+":"+input.to_row
        }else if(input.from_row){
            url += "!"+input.from_row
        }else if(input.to_row){
            url += "!"+input.to_row
        }

        request({
            headers:{
                "Authorization" : "Bearer " + input.access_token,
                "Content-Type"  : "application/json"
            },
            url     : url,
            method  : "GET"
        },function(err,response,body){

            if(err){
                return output(err);
            }

            if(typeof(body) === "string"){
                body = JSON.parse(body)
            }

            if(response.statusCode && response.statusCode === 200){
                return output(null,body);
            }else if(body && body.error && body.error.message){
                return output(body.error.message)
            }

            return output(body)
        })
    };
}