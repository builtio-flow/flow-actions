var google = require('googleapis');

module.exports =function(){

    this.id = "google-drive-move";
    
    this.label = "Move File Or Folder";
    
    this.input = {
        "title": "Move File Or Folder",
        "type": "object",
        "properties": {
            "AccessToken": {
                "type": "string",
                "title": "Authorize to Google Drive",
                "minLength": 1,
                "oauth": "google_drive"
            },
            "source": {
                "title": "Source ID",
                "minLength": 1,
                "type": "string",
                "description": "Enter the file or folder Id to move"
            },
            "dest": {
                "title": "Destination ID",
                "minLength": 1,
                "type": "string",
                "description": "Enter the folder Id where to move file or folder"
            }
        }
    };

    this.help = "Move file and folder to google drive from one folder to another";
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "fileId": {
                "type": "string",
                "title": "fileId",
                "displayTitle": "File ID"
            }
        }
    };

    this.execute = function(input, output){

        var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2();
        oauth2Client.setCredentials({
            access_token : input.AccessToken
        });
        var drive = google.drive({
            version : 'v3',
            auth    : oauth2Client
        });
       
        // Retrieve the existing parents to remove
        drive.files.get({
            fileId : input.source,
            fields : 'parents'
        }, function(err, file) {
            if (err) {
                // Handle error
                return output(err);
            }
            // Move the file to the new folder
            var previousParents = file.parents.join(',');
            drive.files.update({
                fileId          : input.source,
                addParents      : input.dest,
                removeParents   : previousParents,
                fields          : 'id, parents'
            }, function(err, file) {
                if(err) {
                    // Handle error
                    return output(err);

                } else {
                    return output(null, {
                        fileId : input.FileId
                    });
                }
            });
        });
    }
};
