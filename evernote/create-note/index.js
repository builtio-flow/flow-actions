var Evernote = require('evernote').Evernote;
var _ = require('lodash');

module.exports = function () {
    
    this.id = "evernote-create-note";
    
    this.label = "Create Note";
    
    this.input = {
        "title": "Create Note",
        "type": "object",
        "properties": {
            "token": {
                "title": "Authorize Evernote",
                "type": "string",
                "oauth": "evernote",
                "minLength": 1
            },
            "notebookGuid": {
                "title": "Notebook ID",
                "type": "string",
                "description": "Select/Specify the Notebook ID"
            },
            "note_title": {
                "title": "Title",
                "type": "string",
                "minLength": 1,
                "description": "Enter the title of new note"
            },
            "note_body": {
                "title": "Body",
                "type": "string",
                "description": "Enter the body of new note"
            },
            "tag_names":{
                "type":"array",
                "items":{
                    "type":"string",
                    "title":"Tag Name",
                    "description":"Enter the name you want to tag"
                }
            }
        }
    };
    this.help = "Create note in Evernote";
    this.output = {
        "type": "object",
        "properties": {
            "guid": {
                "type": "string",
                "title": "guid",
                "displayTitle": "GUID"
            },
            "title": {
                "type": "string",
                "title": "title",
                "displayTitle": "Title"
            },
            "content": {
                "type": "string",
                "title": "content",
                "displayTitle": "Content"
            },
            "notebookGuid": {
                "type": "string",
                "title": "notebookGuid",
                "displayTitle": "Notebook GUID"
            },
            "notebookName": {
                "type": "string",
                "title": "notebookName",
                "displayTitle": "Notebook Name"
            },
            "created": {
                "type": "number",
                "title": "created",
                "displayTitle": "Created Date Time"
            },
            "updated": {
                "type": "number",
                "title": "updated",
                "displayTitle": "Updated Date Time"
            },
            "deleted": {
                "type": "number",
                "title": "deleted"
            },
            "active": {
                "type": "boolean",
                "title": "active",
                "displayTitle": "Active"
            },
            "updateSequenceNum": {
                "type": "number",
                "title": "updateSequenceNum",
                "displayTitle": "Update Sequence Number"
            },
            "attributes": {
                "type": "object",
                "title": "attributes",
                "properties": {}
            },
            "tagNames":{
                "type":"string",
                "title":"tagNames",
                "displayTitle":"Tag Names"
            },
            "note_shared_url": {
                "type": "string",
                "title": "note_shared_url",
                "displayTitle": "Shared URL"
            }
        }
    };
    this.execute = function (input, output) {


        if (!(input.token && input.token.length > 0)) {
            return output("Evernote access token is missing");
        }
        if (!(input.note_title && input.note_title.length > 0)) {
            return output("Note title is missing");
        }

        var client = new Evernote.Client({
            token: input.token,
            sandbox: false
        });

        var noteStore = client.getNoteStore();
        var nBody = '<?xml version="1.0" encoding="UTF-8"?>';
        nBody += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
        nBody += '<en-note>' + input.note_body + '</en-note>';
        var ourNote = new Evernote.Note();
        ourNote.title = String(input.note_title).trim();
        ourNote.content = nBody;
        ourNote.tagNames = input.tag_names;

        if (input.notebookGuid) {
            ourNote.notebookGuid = input.notebookGuid;
        }
        if (input.note_body){
            ourNote.note_body = input.note_body;
        }

        noteStore.createNote(ourNote, function (err, note) {

            if (err) {
                if(err.identifier == "Note.notebookGuid"){
                    return output("Invalid Notebook ID");
                }
                return output(err);
            }
            
            try {
                delete note.contentHash;
            } catch (e) {
            }

            if (typeof input.note_body == 'string') {
                note.content= input.note_body;
            }

            if (note.tagGuids && (note.tagGuids.length == input.tag_names.length)) {
                note.tagNames = input.tag_names;
            }
            output(null, note);

        });
    }
};
