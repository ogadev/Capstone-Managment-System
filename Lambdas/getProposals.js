const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

//This file is used when we generate the list object for the preferences form.
//Returns the title and projectID of each project from the projectProposals table in dynamo

exports.handler = (event, context, callback) => {
  const params = { TableName: 'projectProposals' };
  dynamodb.scan(params, function(err, data) {
  if (err) {
    console.log(err);
    callback(err);
  }
  else {
    console.log(data);
    const items = data.Items.map(
      (dataField) => {
        return {title: dataField.projectTitle.S, projectID: dataField.proposalID.N};            
        }
      );
      callback(null, items);
    }
  });
};
