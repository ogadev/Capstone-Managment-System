const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2'});

//this lambda function is triggered when a a sponsor submits their project proposal in our form application. 
//this data is then stored in the projectProposals dynamoDB table.

exports.handler = (event, context, callback) => {
    // TODO implement
    const params = {
        Item:{
            "proposalID":{
                N: event.proposalID
            },
            "expectedBackground":{
                S: event.expectedBackground
            },
            "numGroups":{
                N: event.numGroups
            },
            "numMembersPerGroup":{
                N: event.numMembersPerGroup
            },
            "projectDeliverables":{
                S: event.projectDeliverables
            },
            "projectDescription":{
                S: event.projectDescription
            },
            "projectExperience":{
                S: event.projectExperience
            },
            "projectTitle":{
                S: event.projectTitle
            },
            "proposerContactEmail":{
                S: event.proposerContactEmail
            },
            "proposerContactName":{
                S: event.proposerContactName
            },
            "proposerEmail":{
                S: event.proposerEmail
            },
            "proposerOrg":{
                S: event.proposerOrg
            },
            "proposerName":{
                S: event.proposerName
            }
        },
        TableName: "projectProposals"
        }
    dynamodb.putItem(params, function(err,data){
        if(err){
            console.log(err);
            callback(null, event);
        }else{
            callback(null, event);
        }
    })
    
};
