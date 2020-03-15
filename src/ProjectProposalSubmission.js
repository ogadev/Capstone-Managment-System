import React, { Component } from 'react';
import './styles/forms.css';
import { Auth } from "aws-amplify";


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
            fExpectedDeliversables: "",
            fDesiredBackground: "",
            fDesiredNumberGroups: 1,
            fDesiredNumberMembers: 4,
            fSemesterYear: "",

            
        };
        this.onInputChange = this.onInputChange.bind(this)
    }

    submitProposal = async event => {
        //some sort of method 
        //this was just in al of Oscar's messages
        event.preventDefault()   
        console.log("Hello world")
        console.log(this.state.fProjectDescription)
      
    }

   onInputChange(event) {
       const {name, value} = event.target
       this.setState({
           [name]: value
       })
   };
    render() {
        return (
            <div className="proposal-page">            
                <h2 className="form-h2">Project Proposal Submission</h2>
                <form className="proposal-form" onSubmit={this.submitProposal}>
                    <label for="pOrg">Proposer Organization</label>
                    <input
                        type="text" 
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
                        required
                    />
                    <label for="fDesiredNumberMembers">Desired Number of Group Members</label>
                    <input 
                        type="number" 
                        value={this.state.fDesiredNumberMembers}
                        onChange={this.onInputChange}
                        name="fDesiredNumberMembers"
                        required
                    />
                    
                    <button className="btn"> login</button>
                    
                </form>
                <p className="support">If you run into any issues please contact csecapstone@gmail.com</p>
            </div>
        )
    }
}


export default ProjectProposalSubmission