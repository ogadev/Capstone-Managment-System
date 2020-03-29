import React, { Component } from 'react';
import './styles/forms.css';
import { Auth } from "aws-amplify";
import axios from 'axios';

class Preferences extends Component {
    constructor() {
        super()
        this.state = {

            errors: {
                cognito: null,
                blankfield: false
            },
            //don't think we need asu id but will get to start
            fp1: "Project1",
            fp2: "Project 2",
            fp3:"Projct 3",
            fp4:"Project 1",
            fp5:"Project 4",
            fp6:"Project 6",
            fp7:"Project 3",
            fp8:"Project 3",
            fp9:"Project 2",
            fp10:"Project 2",
            asuID:"",
            projects:{}

            
        };
        this.onInputChange = this.onInputChange.bind(this)
    }

    componentDidMount() {
        fetch("https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/project-proposal")
            .then(response => response.json())
            .then(
                (resData) => {
                    for(var key in resData){
                        this.state.projects[key] = resData[key];
                    }
                    console.log(this.state.projects);

                    //populate the 
                });
    }


    clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false
          }
        });
    }

    submitPreferences = async event => {
        //some sort of method 
        //this was just in al of Oscar's messages
        event.preventDefault()   
        
        const response = await axios.post(
        'https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/project-preferences', //this will post to the preferences handler
        {
        /*TODO
        -------------------------------
        figure out wtf to do with proposalID
        */
            "fp1": this.state.fp1,
            "fp2": this.state.fp2,
            "fp3": this.state.fp3,
            "fp4": this.state.fp4,
            "fp5": this.state.fp5,
            "fp6": this.state.fp6,
            "fp7": this.state.fp7,
            "fp8": this.state.fp8,
            "fp9": this.state.fp9,
            "fp10": this.state.fp10,
            "asuID": (this.state.asuID).toString() 
            /*TODO
            ------------------------------
            ASU id should be pulled from the user that is currently logged in.
            **********submission page should not be able to be accessed without being logged in
            */

        })
        

        /*TODO
        -------------------------------
        Handle error response and display to user what went wrong
        */
        console.log(response);


        switch(response.status){
            case 200:
                //send to "thank you\nYour project has been submitted. If you have any further questions please contact capstonecoordinater@asu.edu"
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
        
        console.log("request fired");


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

            
            <div className="preference-page">
                <div className="container">
                    <h2>Project Preference Submission</h2>
                    <form className="preference-form" onSubmit={this.submitPreferences}>
                        <label for="asuID">ASU ID</label>
                        <input
                            type="text" 
                            placeholder="" 
                            value={this.state.asuID}
                            onChange={this.onInputChange}
                            name="asuID"
                            required
                        />
                        <label for="fp1">Preference 1</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp1}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp2">Preference 2</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp2}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp3">Preference 3</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp3}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp4">Preference 4</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp4}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp5">Preference 5</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp5}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp6">Preference 6</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp6}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp7">Preference 7</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp7}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp8">Preference 8</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp8}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp9">Preference 9</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp9}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>
                        <br></br>

                        <label for="fp10">Preference 10</label>
                        <br></br>
                        <select
                            onChange={this.onInputChange}
                            value={this.state.fp10}
                        >
                            <option  value="Project 1">Project 1</option>
                            <option  value="Project 2">Project 2</option>
                            <option  value="Project 3">Project 3</option>
                        </select>

                        <button className="btn">Submit</button>
                        
                    </form>
                    <p className="support">If you run into any issues please contact csecapstone@gmail.com</p>
                </div>
            </div>
        
        
        )
    }
}


export default Preferences