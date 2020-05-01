const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});
var ses = new AWS.SES({region: 'us-east-1'});

//similar to group formation, this was done near the end and has not been stress tested.
//using amazon simple email service(SES) we were to send an email out after the groupFormation was complete to notify people that their groups had been made and the email would contain their group members and sponsor.

exports.handler = (event, context, callback) => {
  const params = { TableName: 'Students' };
  dynamodb.scan(params, function(err, data) {
  if (err) {
    console.log(err);
    callback(err);
  }
  else {
    const items = data.Items.map(
      (dataField) => {
        return {id: dataField.id.S, asurite:dataField.asurite.S};            
        }
      );
      
    console.log(items)
      
    /*var params = {
        Destination: {
            ToAddresses: ["zacharydienstbier@gmail.com"]
        },
        Message: {
            Body: {
                Text: { Data: "Test"
                    
                }
                
            },
            
            Subject: { Data: "Test Email"
                
            }
        },
        Source: "spamdienstbier@gmail.com"
    };

    
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });  */
      
      
      
      
      
    }
  });
  callback(null);
};
