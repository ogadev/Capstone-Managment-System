const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2'});

//this lambda function is triggered when a student submits their preferences in our form application. 
//this data is then stored in the projectPreferences dynamoDB table.

exports.handler = (event, context, callback) => {
    // TODO implement
    const params = {
        Item:{
            "asuID":{
                S: event.asuID
            },
            "fp1":{
                S: event.fp1
            },
            "fp2":{
                S: event.fp2
            },
            "fp3":{
                S: event.fp3
            },
            "fp4":{
                S: event.fp4
            },
            "fp5":{
                S: event.fp5
            },
            "fp6":{
                S: event.fp6
            },
            "fp7":{
                S: event.fp7
            },
            "fp8":{
                S: event.fp8
            },
            "fp9":{
                S: event.fp9
            },
            "fp10":{
                S: event.fp10
            }
        },
        TableName: "projectPreferences"
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
