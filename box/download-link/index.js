var request = require("request");

module.exports = function(){

    this.id = "box-get-download-link";
    
    this.label = "Get Downloadable Link";
    
    this.input = {
        "title": "Get Downloadable Link",
        "type": "object",
        "properties": {
            "token": {
                "title": "Authorize Box",
                "type": "string",
                "oauth": "box",
                "minLength": 1,
                "format": "token"
            },
            "file_id": {
                "title": "File ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter file ID, These ID can be found in Box application URL. For example, if the URL is app.box.com/files/0/f/15957214611/1/f_119233909520, then the File ID is 119233909520"
            }
        }
    };

    this.help = "Service to get download link";
    
    this.output = {
        "type" : "object",
        "properties":{
            "link":{
                "title":"link",
                "type" :"string"
            }
        }
    };

    this.execute = function(input,output){
     
        input.file_id = String(input.file_id).trim();

        var expId = input.file_id.substring(0,2);
        
        if( expId == "f_" ){
            input.file_id = input.file_id.substring(2, input.file_id.length);
        }

        var options = {
            url             : "https://api.box.com/2.0/files/"+input.file_id+"/content",
            method          : "GET",
            followRedirect  : false,
            headers         : {
                Authorization : 'Bearer ' + input.token
            }
        };

        request.get(options,function(err, response, body){          
            if(err){
                return output(err);
            }
            if(typeof(body) === 'string'){
                body = JSON.parse(body);
            }
            if(response.statusCode && response.statusCode === 302){
                return output(null, {'link' : response.headers.location});
            }else if((response.statusCode == 405) || (response.statusCode == 404 && body.code == 'not_found')){
                return output('Invalid file ID entered')
            }
            else{
                return output(body);
            }
        });
    };
};