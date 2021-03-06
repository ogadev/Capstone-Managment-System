import React, { Component } from 'react';
import './styles/forms.css';
import axios from 'axios';
import Header from './Header'

/*************************************************************************
 This is the sponsors submit to the database  of their project proposals to ASU
***************************************************************************/

class ProjectProposalSubmission extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: {
                cognito: null,
                blankfield: false
            },
        
            fProposerOrg: "",
            fProposerName: "",
            fProposerEmail: "",
            fProjectContactName: "",
            fProjectContactEmail: "",
            fProjectTitle: "",
            fProjectDescription: "",
            fProjectExperience: "",
            fExpectedDeliverables: "",
            fDesiredBackground: "",
            fDesiredNumberGroups: 1,
            fDesiredNumberMembers: 4,
            fSemesterYear: "",

            
        };
        this.onInputChange = this.onInputChange.bind(this)
    }


    clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false
          }
        });
    }

    submitProposal = async event => {
        //some sort of method 
        //this was just in al of Oscar's messages
        event.preventDefault()   
        const response = await axios.post(
        'https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/project-proposal',
        {
        /*TODO
        -------------------------------
        figure out wtf to do with proposalID
        */
            "proposalID": "3",
            "expectedBackground": this.state.fDesiredBackground,
            "numGroups": (this.state.fDesiredNumberGroups).toString(),
            "numMembersPerGroup":(this.state.fDesiredNumberMembers).toString(),
            "projectDeliverables": this.state.fExpectedDeliverables,
            "projectDescription": this.state.fProjectDescription,
            "projectExperience": this.state.fProjectExperience,
            "projectTitle": this.state.fProjectTitle,
            "proposerContactEmail": this.state.fProposerContactEmail,
            "proposerContactName":this.state.fProposerContactName,
            "proposerEmail":this.state.fProposerEmail,
            "proposerOrg":this.state.fProposerOrg,
            "semesterYear":this.state.fSemesterYear,
            "proposerName":this.state.fProposerName
        })
        
        console.log(response);
        /*TODO
        -------------------------------
        Handle error response and display to user what went wrong
        */
        switch(response.status){
            case 200:
                //send to "thank you\nYour project has been submitted. If you have any further questions please contact capstonecoordinater@asu.edu"
                //console.log("It worked");
                break;
            case 401: //unauthorized
                break;
            case 403: //forbidden
                break;
            case 404: //not found
                break;
            case 408: //timeout
                break;
            default:
                

        }

        // Converting JSON data to string 
        
       
      
    }

   onInputChange(event) {
       const {name, value} = event.target
       this.setState({
           [name]: value
       })
   };
   //check for the new login after I get the sucess message. 
    render() {
        const {showSignUp} = this.state;
        return (
                <div className="proposal-background">
                    <Header />
                    <div className="proposal-page">
                        
                        <div className="container">
                            <h2>Project Proposal Submission</h2>
                            <form className="proposal-form" onSubmit={this.submitProposal}>
                                <label for="fProposerOrg">Proposer Organization</label>
                                <input
                                    type="text" 
                                    placeholder="" 
                                    value={this.state.fProposerOrg}
                                    onChange={this.onInputChange}
                                    name="fProposerOrg"
                                    required
                                />
                                <label for="pName">Proposer Name</label>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    value={this.state.fProposerName}
                                    onChange={this.onInputChange}
                                    name="fProposerName"
                                    required
                                />
                                <label for="fProposerEmail">Proposer Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="" 
                                    value={this.state.fProposerEmail}
                                    onChange={this.onInputChange}
                                    name="fProposerEmail"
                                    required
                                />
                                <label for="fProposerContactName">Project Contact Name(if different than proposer</label>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    value={this.state.fProposerContactName}
                                    onChange={this.onInputChange}
                                    name="fProposerContactName"
                                    required
                                />
                                <label for="fProposerContactEmail">Project Contact Email(if different than proposer</label>
                                <input 
                                    type="email" 
                                    placeholder="" 
                                    value={this.state.fProposerContactEmail}
                                    onChange={this.onInputChange}
                                    name="fProposerContactEmail"
                                    required
                                />
                                <label for="fProjectTitle">Project Title</label>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    value={this.state.fProjectTitle}
                                    onChange={this.onInputChange}
                                    name="fProjectTitle"
                                    required
                                />
                                <label for="fProjectDescription">Project Description</label>
                                <textarea 
                                    name="fProjectDescription"
                                    rows="10" 
                                    cols="30" 
                                    onChange={this.onInputChange}
                                    value={this.fProjectDescription}
                                ></textarea>
                                <br></br>
                                <label for="fProjectExperience">Project Experience/Learning Goals</label>
                                <textarea 
                                    name="fProjectExperience"
                                    rows="10" 
                                    cols="30" 
                                    onChange={this.onInputChange}
                                    value={this.fProjectExperience}
                                ></textarea>
                                <br></br>
                                <label for="fExpectedDeliverables">Project Deliverables</label>
                                <textarea 
                                    name="fExpectedDeliverables"
                                    rows="10" 
                                    cols="30" 
                                    onChange={this.onInputChange}
                                    value={this.fExpectedDeliverables}
                                ></textarea>
                                <br></br>
                                <label for="fDesiredBackground">Desired Background</label>
                                <textarea 
                                    name="fDesiredBackground"
                                    rows="10" 
                                    cols="30" 
                                    onChange={this.onInputChange}
                                    value={this.fDesiredBackground}
                                ></textarea>
                                <br></br>
                                <label for="fDesiredNumberGroups">Desired Number of Groups</label>
                                <input 
                                    type="number" 
                                    placeholder="" 
                                    value={this.state.fDesiredNumberGroups}
                                    onChange={this.onInputChange}
                                    name="fDesiredNumberGroups"
                                    min="1"
                                    max="5"
                                    required
                                />
                                <label for="fDesiredNumberMembers">Desired Number of Group Members</label>
                                <input 
                                    type="number" 
                                    placeholder="" 
                                    value={this.state.fDesiredNumberMembers}
                                    onChange={this.onInputChange}
                                    name="fDesiredNumberMembers"
                                    min="2"
                                    max="7"
                                    required
                                />                          
                                <button className="btn">Submit</button>
                                
                            </form>
                            <p className="support">If you run into any issues please contact csecapstone@gmail.com</p>
                        </div>
                    </div>
                </div>
            
     
        )
    }
}


export default ProjectProposalSubmission