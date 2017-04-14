var request = require('request');

module.exports = function(){

    this.id = "jive-create-content";
    
    this.label = "Create Content";
    
    this.input = {
        "title": "Create Content",
        "type": "object",
        "properties": {
            "accessToken": {
                "title":"Authorize Jive",
                "type":"string",
                "minLength": 1,
                "oauth" : "jive"
            },
            "contentType": {
                "type": "string",
                "title": "Type",
                "enum": ["Discussion", "Document", "Post"],
                "minLength": 1,
                "description": "Select the Jive content's type that you want to create contents for"
            },
            "subject": {
                "type": "string",
                "title": "Subject",
                "minLength": 1,
                "description": "Enter the subject for new content"
            },
            "text": {
                "type": "string",
                "title": "Description",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter description of content"
            }
        }
    };

    this.help = "Service to create contents in Jive portal like discussion, document, etc";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string",
                "displayTitle" : "Content ID URL"
            },
            "type": {
                "title": "type",
                "type": "string",
                "displayTitle" : "Content Type"
            },
            "subject": {
                "title": "subject",
                "type": "string",
                "displayTitle" : "Subject"
            },
            "content": {
                "title": "content",
                "type": "object",
                "displayTitle" : "Content   Text"
            },
            "published": {
                "title": "published",
                "type": "string",
                "displayTitle" : "Published on"
            },
            "updated": {
                "title": "updated",
                "type": "string",
                "displayTitle" : "Updated on"
            },
            "followerCount": {
                "title": "followerCount",
                "type": "number",
                "displayTitle" : "Follower Count"
            },
            "likeCount": {
                "title": "likeCount",
                "type": "number",
                "displayTitle" : "Like Count"
            },
            "replyCount": {
                "title": "replyCount",
                "type": "number",
                "displayTitle" : "Reply Count"
            },
            "viewCount": {
                "title": "viewCount",
                "type": "number",
                "displayTitle" : "View Count"
            },
            "favoriteCount": {
                "title": "favoriteCount",
                "type": "number",
                "displayTitle" : "Favourite Count"
            },
            "contentID": {
                "title": "contentID",
                "type": "string",
                "displayTitle" : "Content ID"
            },
            "status": {
                "title": "status",
                "type": "string",
                "displayTitle" : "Status"
            },
            "visibility": {
                "title": "visibility",
                "type": "string",
                "displayTitle" : "Visibility"
            },
            "author": {
                "title": "author",
                "type": "object",
                "displayTitle" : "Author",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "string",
                        "displayTitle" : "Author ID"
                    },
                    "displayName": {
                        "title": "displayName",
                        "type": "string",
                        "displayTitle" : "Display Name"
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        var typeObj = {
            "Document": "document",
            "Discussion": "discussion",
            "Post": "post"
        };

        request({
            method :'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization' : 'Bearer ' + input.accessToken
            },
            url: input._oauth.jive_host + "/api/core/v3/contents",
            json: {
                "type": typeObj[input.contentType],
                "subject": input.subject,
                "content": {
                    "type": "text/html",
                    "text": input.text
                }
            },
            gzip:true
        }, function(err, res, body){
            
            if(err){
                return output(err);
            }

            if (res.statusCode === 200){

                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }

                return output(null , body);
            }
            return output(body);
        })
    }
};