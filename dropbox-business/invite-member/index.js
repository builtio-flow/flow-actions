var request = require("request");

module.exports = function() {

	this.id = "dropbox-business-invite-member";

	
	this.label = "Invite Members";
	
	this.input = {
		"title": "Invite Members",
		"type": "object",
		"properties": {
			"AccessToken": {
				"title": "Authorize Dropbox Business",
				"type": "string",
				"oauth": "dropbox_business",
				"minLength": 1,
				"propertyOrder": 1
			},
			"new_member": {
				"title": "Members",
				"description": "A maximum of 20 members can be added at a time",
				"type": "array",
				"items": {
					"title": "Member",
					"type": "object",
					"properties": {
						"member_given_name": {
							"title": "First Name",
							"type": "string",
							"description": "Enter the first name of the member",
							"minLength": 1
						},
						"member_surname": {
							"title": "Last Name",
							"type": "string",
							"description": "Enter the last name of the member",
							"minLength": 1
						},
						"member_email": {
							"title": "Email ID",
							"type": "string",
							"description": "Enter the email ID of the member to whom you wish to invite",
							"minLength": 1
						},
						"member_external_id": {
							"title": "External ID",
							"type": "string"
						},
						"send_welcome_email": {
							"title": "Send welcome email",
							"type": "boolean",
							"description": "Specify if you wish to send a welcome email to the member"
						},
						"role": {
							"title": "Role",
							"type": "string",
							"decription": "Select the role you wish to assign to this member",
							"enum": [
								"",
								"team_admin",
								"user_management_admin",
								"support_admin",
								"member_only"
							]
						}
					}
				},
				"minItems": 1,
				"propertyOrder": 2
			}
		}
	};

	this.output = {
		"title": "output",
		"type": "object",
		"properties": {
			"complete": {
				"title": "complete",
				"displayTitle": "Complete",
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"user_already_on_team": {
							"title": "user_already_on_team",
							"displayTitle": "User Already On Team",
							"type": "boolean"
						},
						"tag": {
							"title": "tag",
							"displayTitle": "Tag",
							"type": "string"
						},
						"role": {
							"title": "role",
							"displayTitle": "Role",
							"type": "object",
							"properties": {
								"tag": {
									"title": "tag",
									"displayTitle": "Tag",
									"type": "string"
								}
							}
						},
						"team_member_id": {
							"title": "team_member_id",
							"displayTitle": "Team Member ID",
							"type": "string"
						},
						"account_id": {
							"title": "account_id",
							"displayTitle": "Account ID",
							"type": "string"
						},
						"email": {
							"title": "email",
							"displayTitle": "Email",
							"type": "string"
						},
						"email_verified": {
							"title": "email_verified",
							"displayTitle": "Email Verified",
							"type": "boolean"
						},
						"status": {
							"title": "status",
							"displayTitle": "Status",
							"type": "object",
							"properties": {
								"tag": {
									"title": "tag",
									"displayTitle": "Tag",
									"type": "string"
								}
							}
						},
						"membership_type": {
							"title": "membership_type",
							"displayTitle": "Membership Type",
							"type": "object",
							"properties": {
								"tag": {
									"title": "tag",
									"displayTitle": "Tag",
									"type": "string"
								}
							}
						},
						"groups": {
							"title": "groups",
							"displayTitle": "Groups",
							"type": "array",
							"items": {}
						},
						"given_name": {
							"title": "given_name",
							"displayTitle": "Given Name",
							"type": "string"
						},
						"surname": {
							"title": "surname",
							"displayTitle": "Surname",
							"type": "string"
						},
						"familiar_name": {
							"title": "familiar_name",
							"displayTitle": "Familiar Name",
							"type": "string"
						},
						"display_name": {
							"title": "display_name",
							"displayTitle": "Display Name",
							"type": "string"
						},
						"abbreviated_name": {
							"title": "abbreviated_name",
							"displayTitle": "Abbreviated Name",
							"type": "string"
						}
					}
				}
			},
			"tag": {
				"title": "tag",
				"displayTitle": "Tag",
				"type": "string"
			}
		}
	};

	this.execute = function(input, output) {

		if(input.new_member){
			input.new_member.forEach(function(item, index){
				if(item.role){
					item.role = { ".tag" : item.role }
				}else{
					try{
						delete item.role
					}catch(e){
					}
				}
			})
		}

		var options = {

			method	: "POST",
			url 	: "https://api.dropboxapi.com/2/team/members/add",
			headers	: {
				'Authorization': 'Bearer ' + input.AccessToken
			},
			json 	: {
				"new_members": input.new_member
			}
		}

		request(options, function(err, res, body) {
			
			if (err) {
				return output(err)
			}

			try {
				if(body && typeof(body) === "string"){
					body = JSON.stringify(body)
				}
			}catch(e) {
				output(e)
			}

			if (res && res.statusCode == 200) {
				if(body['.tag']){
					body.tag = body['.tag']
					delete body['.tag']
					try{
						if(body && body.complete){
							body.complete.map(function (item, index) {
								if(item['.tag']){
									item.tag = item['.tag']
									delete item['.tag']
								}
								if(item.role && item.role['.tag']){
									item.role.tag = item.role['.tag']
									delete item.role['.tag']
								}
								if(item.profile && item.profile.status && item.profile.status['.tag']){
									item.profile.status.tag = item.profile.status['.tag']
									delete item.profile.status['.tag']
								}
								if(item.profile && item.profile.membership_type && item.profile.membership_type['.tag']){
									item.profile.membership_type.tag = item.profile.membership_type['.tag']
									delete item.profile.membership_type['.tag']
								}	
								if(item.profile){
									flatten_schema(item, 'profile')
								}
								if(item.name){
									flatten_schema(item, 'name')
								}
								if(!item.user_already_on_team){
									item.user_already_on_team = false
								}
							});
						}						
					}
					catch(e){
						return output(e)
					}
				}
				return output(null, body)
			}
			return output(body)
		});
	}
};


function flatten_schema(body,val){
	try{ 
		Object.keys(body[val]).map(function (m,i) {
		 	body[m] = body[val][m];
		});
		delete body[val]
	}catch(e){
		console.log(e)
	}
}