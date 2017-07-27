var google = require('googleapis');

module.exports = function() {
    this.id = "google-drive-delete";
    this.label = "Delete File";
    this.input = {
        "title": "Delete File or Folder",
        "type": "object",
        "properties": {
            "AccessToken": {
                "type": "string",
                "title": "Authorize Google Drive",
                "minLength": 1,
                "oauth": "google_drive"
            },
            "FileId": {
                "title": "File ID",
                "minLength": 1,
                "type": "string",
                "description": "Enter ID of the file you want to delete from Google Drive",
            }
        }
    };

    this.help = "Delete File or Folder";
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

    this.execute = function(input, output) {
        var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2;
        oauth2Client.setCredentials({
            "access_token": input.AccessToken
        });
        var drive = google.drive({
            version: 'v2',
            auth: oauth2Client
        });
        drive.files.delete({
            "fileId": input.FileId
        }, function(err) {
            if (err) {
                return output(err);
            }
            return output(null, {
                "fileId": input.FileId
            });
        });
    }
};