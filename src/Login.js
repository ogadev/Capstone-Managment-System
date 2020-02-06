import React, { Component } from 'react';
import './styles/style.css'
import { Auth } from "aws-amplify";




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
       Auth.signUp(sEmail, sPassword)
       .then(data => console.log(data))
       .catch(error => console.log(error))
    }

    handleSubmit = async event => {
        event.preventDefault();
        console.log("it works")
        try {
            const user = await Auth.signIn(this.state.email, this.state.password);
            console.log(user);
            this.props.history.push("/googleforms");
        
        }catch(error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
            errors: {
                ...this.state.errors,
                cognito: err
            }
            });
            console.log(error)
            console.log("it didn't work")
        }
    };

   onInputChange(event) {
       const {name, value} = event.target
       this.setState({
           [name]: value
       })
   };

    render() {
        const {showSignUp} = this.state;
        return (
            <body>

                <div className="asu-image">
                    <div className="container">
                        <h1 className="intro">Arizona State Computer Science Capstone Project Managment</h1>
                        <p className="intro-note">Build Something Cool Today</p>
                        </div>
                </div> 
                <div className="login-page">
                    <div className="container">
                        <h2>Welcome to the Capstone Project Managment Dashboard</h2>
                        <p>If this is your first time logging in, please check your ASU email to get your login credentials, and change your password.</p>
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <input
                                type="text" 
                                placeholder="username" 
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
                                <p className="under-login-items">forgot password?</p>
                                <p
                                    className="under-login-items" 
                                    onClick={() => this.setState({showSignUp: true})}>Sign up</p> 
                            </div>
                            
                        </form>
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
                                />    
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Email"
                                    value={this.state.sEmail}
                                    onChange={this.onInputChange}
                                    name="sEmail"
                                />
                    
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Password"
                                    value={this.state.sPassword}
                                    onChange={this.onInputChange}
                                    name="sPassword"
                                />
                                <label>Re-enter Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Password"
                                    value={this.state.sConfirmPassword}
                                    onChange={this.onInputChange}
                                    name="sConfirmPassword"
                                />
                                <label>ID Number</label>
                                <input 
                                    type="numbers" 
                                    placeholder="Enter ID Number"
                                    value={this.state.idNumber}
                                    onChange={this.onInputChange}
                                    name="sIdnumber"
                                />
                                <button className="btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    </div>
                :null
                 }
            
            </body>
        )
    }
}


export default Login