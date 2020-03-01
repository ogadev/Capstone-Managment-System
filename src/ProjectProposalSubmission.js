import React, { Component } from 'react';
import './styles/style.css';
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
        console.log("Hello world")
      
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
            <div className="login-body">

                <div className="asu-image">
                    <div className="container">
                        <h1 className="intro">Arizona State Computer Science Capstone Project Management</h1>
                        <p className="intro-note">Build Something Cool Today</p>
                        </div>
                </div> 
                <div className="proposal-page">
                    <div className="container">
                        <h2>Project Proposal Submission</h2>
                        <form className="proposal-form" onSubmit={this.submitProposal}>
                            <label for="pOrg">Proposer Organization</label>
                            <input
                                type="text" 
                                placeholder="email" 
                                value={this.state.fProposerOrg}
                                onChange={this.onInputChange}
                                name="pOrg"
                                required
                            />
                            <label for="pName">Proposer Name</label>
                            <input 
                                type="text" 
                                placeholder="password" 
                                value={this.state.password}
                                onChange={this.onInputChange}
                                name="pName"
                                required
                            />
                            <h3>Proposer Email Address</h3>
                            
                            <h3>Project Contact Name(if different than proposer)</h3>
                            <h3>Project Contact Email(if different than proposer)</h3>
                            <h3>Project Title</h3>
                            <h3>Project Description</h3>
                            <h3>Student Learning Goals/Experience</h3>
                            <h3>Expected Deliverables</h3>
                            <h3>Desired Background</h3>
                            <h3>Desired # of Groups</h3>
                            <h3>Desired # of Group Members</h3>
                            <h3>Interest in sponsoring a course section</h3>
                            <textarea 
                                name="message"
                                rows="10" 
                                cols="30" 
                                onChange={this.onInputChange}
                                value={this.fProjectDescription}
                            ></textarea>
                            <button className="btn"> login</button>
                            
                        </form>
                        <p className="support">If you run into any issues please contact csecapstone@gmail.com</p>
                    </div>
                </div>
            
            </div>
        )
    }
}


export default ProjectProposalSubmission