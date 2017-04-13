var google      = require('googleapis');

module.exports = function(){
    
    this.id = 'gmail-send-email';
    
    this.label = "Send an Email";
    
    this.input = {
        title : "Send an Email",
        type : "object",
        properties : {
            "access_token" : {
                title : "Authorize Gmail",
                type : "string",
                minLength: 1,
                oauth: 'gmail'
            },
            "to" : {
                title : "To",
                type : "string",
                format : "textarea",
                "description": "Enter the email ID of the user to whom you wish to send the email. You can add multiple email IDs separated by a new line",
                minLength : 1
            },
            "cc" : {
                title : "Cc",
                type : "string",
                "description": "Enter the email ID of the user to whom you wish to Cc in the email. You can add multiple email IDs separated by a new line",                
                format : "textarea"
            },
            "bcc" : {
                title : "Bcc",
                type : "string",
                format : "textarea",
                "description": "Enter the email ID of the user to whom you wish to Bcc in the email. You can add multiple email IDs separated by a new line",

            },
            "subject" : {
                title : "Subject",
                type : "string",
                "minLength": 1,
                "description": "Enter the subject of the email"
            },
            "body" : {
                title : "Body",
                type : "string",
                format : "textarea",
                "minLength": 1,
                "description": "Enter the content that you wish to include in the body of the email"

            }
        }
    };

    this.output = {
        title : "output",
        type : "object",
        properties : {
            id : {
                title : "id",
                type : "string"
            },
            threadId : {
                title : "threadId",
                type : "string"
            }
        }
    };

    this.help = "Send an email from your Gmail account";
    
    this.execute = function(input, output){
        
        var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2;
        
        oauth2Client.setCredentials({
            access_token: input.access_token
        });
        
        var gmailClass = google.gmail('v1');
        var email_lines = [];
        
        if(input.to){
            input.to = "To: " + input.to.replace(/\n+/gm, ',').replace(/,+/gm, ',');
            email_lines.push(input.to);
        }
        if(input.cc){
            input.cc = "Cc: " + input.cc.replace(/\n+/gm, ',').replace(/,+/gm, ',');
            email_lines.push(input.cc);
        }
        if(input.bcc){
            input.bcc = "Bcc: " + input.bcc.replace(/\n+/gm, ',').replace(/,+/gm, ',');
            email_lines.push(input.bcc);
        }
        
        email_lines.push('Content-type: text/html;charset=iso-8859-1');
        email_lines.push('MIME-Version: 1.0');
        input.subject = input.subject || "No Subject";
        email_lines.push("Subject: " + input.subject);
        email_lines.push("");
        input.body = input.body || "";
        
        if(input.body && typeof(input.body) === 'object'){
            input.body = JSON.stringify(input.body);
        }
        
        email_lines.push(input.body);
        var email = email_lines.join("\r\n").trim();
        var base64EncodedEmail = (new Buffer(email)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        
        gmailClass.users.messages.send({
            auth: oauth2Client,
            userId: "me",
            resource: {
                raw: base64EncodedEmail
            }
        },
        
        function(err, results){
            if(results && results.id){
                return output(null, results);
            }
            output((err|| results));
        });

    }
}
