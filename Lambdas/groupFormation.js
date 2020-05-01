const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

//this is a file that pulls the project proposals and the project preferences and then creates groups accordingly.
//was working on this near the end, has not been stress tested.


exports.handler = (event, context, callback) => {
  const params = { TableName: 'projectProposals' };
  var proposals = {};
  var preferences = {};
  
  
  
  const params2 = { TableName: 'projectPreferences' };

  dynamodb.scan(params2, function(err, data) {
  if (err) {
    console.log(err);
    callback(err);
  }
  else {
    //console.log(data);
    preferences = data.Items.map(
      (dataField) => {
        return {fp1: dataField.fp1.S, fp2: dataField.fp2.S, fp3: dataField.fp3.S, fp4: dataField.fp4.S, fp5: dataField.fp5.S, fp6: dataField.fp6.S, fp7: dataField.fp7.S, fp8: dataField.fp8.S, fp9: dataField.fp9.S, fp10: dataField.fp10.S, asuID: dataField.asuID.S};            
        }
      );
      
    }
    
  dynamodb.scan(params, function(err, data) {
  if (err) {
    console.log(err);
    callback(err);
  }
  else {
      //console.log(data.Items);
        proposals = data.Items.map(
        (dataField) => {
            return { size:0, projectID: dataField.proposalID.N, numMembers: dataField.numMembersPerGroup.N, expectedBackground: dataField.expectedBackground.S, numGroups:dataField.numGroups.N, projectDeliverables:dataField.projectDeliverables.S, projectDescription:dataField.projectDescription.S, projectExperience:dataField.projectExperience.S, projectTitle:dataField.projectTitle.S, proposerContactEmail:dataField.proposerContactEmail.S, proposerContactName:dataField.proposerContactName.S, proposerEmail:dataField.proposerEmail.S, proposerOrg:dataField.proposerOrg.S, proposerName:dataField.proposerName.S};                
            }
        );

        

        //console.log(proposals);
        var realProposals = {}
        for(var index  = 0 ; index < proposals.length; index++){
            if(typeof proposals[index].numMembers === 'undefined'){
                proposals[index].numMembers = 4;
            }
            realProposals[proposals[index].projectID] = {group:[], size:0, numMembers:proposals[index].numMembers, projectID:proposals[index].projectID, proposerEmail:proposals[index].proposerEmail};
        }

        (realProposals['2'].group.push("yellow"));
        (realProposals['2'].group.push("red"));
        (realProposals['2'].group.push("green"));
        realProposals['2'].size = 3;
        console.log(realProposals)

        
        unluckyStudents = [];
        
        //console.log(preferences);

        //sorting
        for(index = 0; index < preferences.length; index++){
            var current = preferences[index]
            if(typeof realProposals[current.fp1]  !== 'undefined' && realProposals[current.fp1].size < realProposals[current.fp1].numMembers){
                realProposals[current.fp1].group.push(preferences[index].asuID);
                realProposals[current.fp1].size++;
            }else if(typeof realProposals[current.fp2]  !== 'undefined' && realProposals[current.fp2].size < realProposals[current.fp2].numMembers){
                realProposals[current.fp2].group.push(preferences[index].asuID);
                realProposals[current.fp2].size++;
            }else if(typeof realProposals[current.fp3]  !== 'undefined' && realProposals[current.fp3].size < realProposals[current.fp3].numMembers){
              realProposals[current.fp3].group.push(preferences[index].asuID);
              realProposals[current.fp3].size++;
            }
            else if(typeof realProposals[current.fp4]  !== 'undefined' && realProposals[current.fp2].size < realProposals[current.fp4].numMembers){
              realProposals[current.fp4].group.push(preferences[index].asuID);
              realProposals[current.fp4].size++;
            }
            else if(typeof realProposals[current.fp5]  !== 'undefined' && realProposals[current.fp5].size < realProposals[current.fp5].numMembers){
              realProposals[current.fp5].group.push(preferences[index].asuID);
              realProposals[current.fp5].size++;
            }
            else if(typeof realProposals[current.fp6]  !== 'undefined' && realProposals[current.fp6].size < realProposals[current.fp6].numMembers){
              realProposals[current.fp6].group.push(preferences[index].asuID);
              realProposals[current.fp6].size++;
            }
            else if(typeof realProposals[current.fp7]  !== 'undefined' && realProposals[current.fp7].size < realProposals[current.fp7].numMembers){
              realProposals[current.fp7].group.push(preferences[index].asuID);
              realProposals[current.fp7].size++;
            }
            else if(typeof realProposals[current.fp8]  !== 'undefined' && realProposals[current.fp8].size < realProposals[current.fp8].numMembers){
              realProposals[current.fp8].group.push(preferences[index].asuID);
              realProposals[current.fp8].size++;
            }
            else if(typeof realProposals[current.fp9]  !== 'undefined' && realProposals[current.fp9].size < realProposals[current.fp9].numMembers){
              realProposals[current.fp9].group.push(preferences[index].asuID);
              realProposals[current.fp9].size++;
            }
            else if(typeof realProposals[current.fp10]  !== 'undefined' && realProposals[current.fp10].size < realProposals[current.fp10].numMembers){
              realProposals[current.fp10].group.push(preferences[index].asuID);
              realProposals[current.fp10].size++;
            }else{
              //the guy got none of his choices, this is unlucky.
              unluckyStudents.push(current.asuID)
            }

        }

        console.log(unluckyStudents);


        
        for(var key in realProposals){
          const params = {
            Item:{
                "projectID":{
                    S:realProposals[key].projectID
                },
                "groupString":{
                    S:realProposals[key].group.toString()
                },
                "proposerContactEmail":{
                  S:realProposals[key].proposerEmail
                }
            },
            TableName: "groups"
            }
            dynamodb.putItem(params, function(err,data){
                if(err){
                    console.log(err);
                    callback(null, event);
                }else{
                    callback(null, event);
                }
            })
        }
    }
  });  
    
    
  });

  callback(null);
  
  
};
