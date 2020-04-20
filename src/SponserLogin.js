import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import './styles/style.css';
import { Auth } from "aws-amplify";


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {
                cognito: null,
                blankfield: false
            },
        
            sName: "",
            sEmail: "",
            sPassword: "",
            sConfirmPassword: "",
            sIdNumber: "9999999999",
            sCompanyName: "",
            showSignUp: false
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

    signUpSubmit = async event => {
        event.preventDefault();
       const {sName, sEmail, sPassword, sConfirmPassword, sIdNumber, sCompanyName} = this.state;
       if (sPassword !== sConfirmPassword) {
           alert("passwords don't match");
       }
       else if(sPassword === "password"){
           alert("Don't make your password, \"password\". Please");
       }
       else if(sIdNumber.length !== 10){
           //TODO:: trim spaces
           alert("ID number must be 10 characters")
       }
       else if(sPassword.length < 8){
           alert("Password must be at least 8 characters")
       }else if(sCompanyName.length < 1){
           alert("Please enter a valid company name!")
       }
       else {
            Auth.signUp({
                                
                'username': sEmail,
                'password': sPassword,
                'attributes': {
                    'custom:name': sName,
                    'custom:ASUID': sIdNumber,
                    'custom:customCompanyName': sCompanyName 
                }
            })
            .then(data => {
                alert("Check your email for confirmation link");
                console.log(data);
            })
            .catch(error => {
                alert("sign up failed");
                console.log(error)
            })
            }     
      
    }

    signInSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;
       
        // const history = useHistory();
        Auth.signIn({
            'username': email,
            'password': password
        })
        .then(user=> {
            console.log(user);
            console.log("authentication work");
            this.props.history.push('/proposal'); //TODO change to the right path


        })
        .catch(error =>{
            console.log(error);
            console.log("authentication failed!");
        })
    };

    signOut = async (event) => {
        const config = {
            headers: { Authorization: (await Auth.currentSession()).getIdToken().getJwtToken() }
        }
        

        Auth.signOut()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

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
                <div className="login-page">
                    <div className="container">
                        <h2>Welcome to the Capstone Project Managment Sponsor Dashboard</h2>
                        <form className="login-form" onSubmit={this.signInSubmit}>
                            <input
                                type="email" 
                                placeholder="email" 
                                value={this.state.email}
                                onChange={this.onInputChange}
                                name="email"
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="password" 
                                value={this.state.password}
                                onChange={this.onInputChange}
                                name="password"
                                required
                            />
                            <button className="btn"> login</button>    
                            <div className="under-login">
                                <p className="under-login-items" ><a href="/forgotpassword">forgot password?</a></p>
                                <p
                                    className="under-login-items" 
                                    onClick={() => this.setState({showSignUp: true})}>Sign up</p> 
                            </div> 
                        </form>
                        <button onClick={() => this.signOut()}>sign out</button>
                        <p className="support">If you run into any issues please contact support</p>
                    </div>
                </div>
                { showSignUp
                 ? <div className="sign-up-background">
                    <div className="sign-up-content">
                        <form className="modal-content" onSubmit={this.signUpSubmit}>
                            <div className="modal-container">
                                <h2>Sign Up</h2>
                                <div 
                                    className="close-button"
                                    onClick={() => this.setState({showSignUp: false})}
                                    >+</div>
                                <p>Please fill in this form to create an account</p>
                                <hr/>
                                <label for="name">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Name"
                                    value={this.state.sName}
                                    onChange={this.onInputChange}
                                    name="sName"
                                    required
                                />    
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Email"
                                    value={this.state.sEmail}
                                    onChange={this.onInputChange}
                                    name="sEmail"
                                    required
                                />
                    
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Password"
                                    value={this.state.sPassword}
                                    onChange={this.onInputChange}
                                    name="sPassword"
                                    required
                                />
                                <label>Re-enter Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Password"
                                    value={this.state.sConfirmPassword}
                                    onChange={this.onInputChange}
                                    name="sConfirmPassword"
                                    required
                                />
                                <label>Company Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your company name"
                                    value={this.state.sCompanyName}
                                    onChange={this.onInputChange}
                                    name="sCompanyName"
                                    required
                                />
                                <button className="btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    </div>
                :null
                 }
            
            </div>
        )
    }
}


export default withRouter(Login)