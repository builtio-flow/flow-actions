var request = require("request");

module.exports = function(){
    
    this.id = "dropbox-delete-file-folder";
    
    this.label = "Delete File or Folder";
    
    this.input = {
        "title": "Delete File or Folder",
        "type": "object",
        "properties": {
            "AccessToken": {
                "title": "Authorize Dropbox",
                "type": "string",
                "oauth": "dropbox",
                "minLength": 1,
                "propertyOrder": 1
            },
            "Root": {
                "title": "Root",
                "description": "The root relative to which path is specified. Valid values are auto (recommended), sandbox, and dropbox",
                "type": "string",
                "enum": [
                    "auto",
                    "sandbox",
                    "dropbox"
                ],
                "propertyOrder": 2
            },
            "FilePath": {
                "title": "Path",
                "description": "The path to the file or folder to be deleted",
                "type": "string",
                "minLength": 1,
                "propertyOrder": 3
            }
        }
    };


    this.help = "To delete a file or folder given its path";

    this.output = {
        "type": "object",
        "properties": {
            "is_deleted": {
                "type": "boolean",
                "title": "is_deleted",
                "displayTitle": "Is Deleted"
            },
            "modified": {
                "type": "string",
                "title": "modified",
                "displayTitle": "Modified Date Time"
            },
            "path": {
                "type": "string",
                "title": "path",
                "displayTitle": "File/Folder Path"
            },
            "bytes": {
                "type": "number",
                "title": "bytes"
            },
            "is_dir": {
                "type": "boolean",
                "title": "is_dir",
                "displayTitle": "Is Directory"
            },
            "revision": {
                "type": "number",
                "title": "revision",
                "displayTitle": "Revision Number"
            },
            "root": {
                "type": "string",
                "title": "root",
                "displayTitle": "Root Directory"
            },
            "size": {
                "type": "string",
                "title": "size",
                "displayTitle": "File/Folder Size"
            },
            "thumb_exists": {
                "type": "boolean",
                "title": "thumb_exists",
                "displayTitle": "Is Thumbnail Exists"
            },
            "icon": {
                "type": "string",
                "title": "icon",
                "displayTitle": "Icon"
            },
            "rev": {
                "type": "string",
                "title": "rev",
                "displayTitle": "Rev"
            }
        }
    };

    this.execute = function (input, output) {

        var params = {
            "root" : input.Root,
            "path" : input.FilePath
        };

        request.post({
            url : 'https://api.dropbox.com/1/fileops/delete',
            headers:{
                Authorization:'Bearer ' + input.AccessToken
            },
            form : params
        },function (err, response, body){
            if(err) {
                return output(err);
            }
            if(typeof(body) === "string"){
                try{
                    body = JSON.parse(body);
                }catch(e){
                }
            }
            if(body && body.error){
                return output(body.error);
            }

            return output(null, body);
            
        });
    }
};
