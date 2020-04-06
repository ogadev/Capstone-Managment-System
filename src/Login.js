import React, { Component } from 'react';
import './styles/style.css';
import { Auth } from "aws-amplify";
import axios from 'axios';
// Amplify.configure({
//     // OPTIONAL - if your API requires authentication 
  
//     API: {
//         endpoints: [
//             {
//                 name: "CMS_API",
//                 endpoint: "https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev"
//             }
//         ]
//     }
// });


class Login extends Component {
    constructor() {
        super()
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
            sIdNumber: "",

            
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
       const {sName, sEmail, sPassword, sConfirmPassword, sIdNumber} = this.state;
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
       }
       else {
            console.log("https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/"+sIdNumber)
            fetch("https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/"+sIdNumber)
                .then(response => response.json())
                .then(data => {
                    if (data["Count"] > 0){
                        Auth.signUp({
                            
                            'username': sEmail,
                            'password': sPassword,
                            'attributes': {
                                'custom:name': sName,
                                'custom:ASUID': sIdNumber
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
                    }else{
                        alert("The student ID you entered is not signed up for the course\nIf you think this is a mistake contact your administrator")
                    }
                })
            }     
      
    }

    signInSubmit = async event => {
        const {email, password} = this.state;

        event.preventDefault();
        Auth.signIn({
            'username': email,
            'password': password
        })
        .then(user=> {
            console.log(user);
            console.log("authentication work");
            this.props.history.push('/home')

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
        // const auth = (await Auth.currentSession()).getIdToken().getJwtToken();
        // const response = await axios.post(
        //     'https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/post-test-authorizer',
        //     {name: 'Oscar Amaya'},
        //     config 
        // )

        Auth.signOut()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        // let testingman = false;
        // testingman = Auth.currentUserInfo()
        //     .then(res => {
        //         console.log(res);
        //         console.log("je")
        //         return true;
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        // console.log(testingman)
    

        // console.log(response)
        // let apiName = 'CMS_API';
        // let path = 'https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/post-test-authorizer'
        // let myInit = { 
        //     headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        // }
        // return await API.post(apiName, path, myInit);

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
                        <h2>Welcome to the Capstone Project Managment Dashboard</h2>
                        <p>If this is your first time logging in, please check your ASU email to get your login credentials, and change your password.</p>
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
                                <label>ID Number</label>
                                <input 
                                    type="numbers" 
                                    placeholder="Enter ID Number"
                                    value={this.state.sIdNumber}
                                    onChange={this.onInputChange}
                                    name="sIdNumber"
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


export default Login