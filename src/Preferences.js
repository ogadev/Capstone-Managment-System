import React, { Component } from 'react';
import './styles/forms.css';
import { Auth } from "aws-amplify";
import axios from 'axios';
import Header from './Header'
class Preferences extends Component {
    constructor() {
        super()
        this.state = {

            errors: {
                cognito: null,
                blankfield: false
            },
            //don't think we need asu id but will get to start
            fp1:"select",
            fp2:"select",
            fp3:"select",
            fp4:"select",
            fp5:"select",
            fp6:"select",
            fp7:"select",
            fp8:"select",
            fp9:"select",
            fp10:"select",
            asuID:"",
            projects:[],
            yellow:[]
            
        };
        this.onInputChange = this.onInputChange.bind(this)
        this.handleChange = this.onInputChange.bind(this)
        //this.checkInputValidity = this.checkInputValidity.bind(this)

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
                   
                    this.setState({
                        yellow: ["select","1","2","3"]
                    })
                    console.log(this.state.yellow)
                    
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

    //verifies that none of the select fields have been left on "select" and that the asu id is only numbers and is 10 digits long
    checkInputValidity(){
        var reg = /^\d+$/;

        if(this.state.fp1 === "select" || this.state.fp2 === "select" || this.state.fp3 === "select" || this.state.fp4 === "select" || 
        this.state.fp5 === "select" || this.state.fp6 === "select" || this.state.fp7 === "select" || this.state.fp8 === "select" ||
        this.state.fp9 === "select" || this.state.fp10 === "select" || !reg.test(this.state.asuID) || this.state.asuID.length != 10){
            return false;
        }else{
            return true;
        }
    }

    submitPreferences = async event => {
        //some sort of method 
        //this was just in al of Oscar's messages
        event.preventDefault()   
        if(this.checkInputValidity()){
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
                
        }else{
            //need to 
            console.log("nice try");
        }


        
    }

   onInputChange(event) {
       const {name, value} = event.target
       this.setState({
           [name]: value
       })
   };
   handleChange(event) {
    this.setState({testExample: event.target.value});
  }

  

   
   //check for the new login after I get the sucess message. 
    render() {
        const {showSignUp} = this.state;
        return (

            
            <div className="preference-page">
                <Header/>
                <div className="container">
                    <h2>Project Preference Submission</h2>
                    <form className="preference-form" onSubmit={this.submitPreferences}>

                        <label for="asuID">ASU ID</label>
                        <input
                            className="asu-id-input"
                            type="text" 
                            placeholder="" 
                            value={this.state.asuID}
                            onChange={this.onInputChange}
                            name="asuID"
                            required
                        />
                        <div>
                        
                            <label for="fp1">Preference 1</label>
                            <br></br>
                            <select
                                value={this.state.fp1}
                                onChange={(e) => this.setState({fp1: e.target.value})}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
                            </select>
                            <br></br>

                            <label for="fp2">Preference 2</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp2: e.target.value})}
                                value={this.state.fp2}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}

                            </select>
                            <br></br>

                            <label for="fp3">Preference 3</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp3: e.target.value})}
                                value={this.state.fp3}
                            >         
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
   
                            </select>
                            <br></br>

                            <label for="fp4">Preference 4</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp4: e.target.value})}
                                value={this.state.fp4}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
                            </select>
                            <br></br>

                            <label for="fp5">Preference 5</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp5: e.target.value})}
                                value={this.state.fp5}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}

                            </select>
                            <br></br>

                            <label for="fp6">Preference 6</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp6: e.target.value})}
                                value={this.state.fp6}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}

                            </select>
                            <br></br>

                            <label for="fp7">Preference 7</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp7: e.target.value})}
                                value={this.state.fp7}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
                            </select>
                            <br></br>

                            <label for="fp8">Preference 8</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp8: e.target.value})}
                                value={this.state.fp8}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
                            </select>
                            <br></br>

                            <label for="fp9">Preference 9</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp9: e.target.value})}
                                value={this.state.fp9}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}

                            </select>
                            <br></br>

                            <label for="fp10">Preference 10</label>
                            <br></br>
                            <select
                                onChange={(e) => this.setState({fp10: e.target.value})}
                                value={this.state.fp10}
                            >
                                {this.state.yellow.map((proj) => <option value={proj} key={proj}>{proj}</option>)}
                            </select>
                        </div>
                        <button className="btn btnPreferences">Submit</button>
                        
                    </form>
                    <p className="support">If you run into any issues please contact csecapstone@gmail.com</p>
                </div>
            </div>
        
        
        )
    }
}


export default Preferences