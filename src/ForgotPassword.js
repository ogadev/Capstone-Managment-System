import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './styles/styleForgot.css';


class ForgotPassword extends Component{
    constructor(){
        super()
        this.state ={
            code: "",
            email: "",
            password: "",
            confirmPassword: "",
            Notsubmitted: true
        }
        this.onInputChange = this.onInputChange.bind(this)
    }

    forgotPasswordRequest = async event => {
        event.preventDefault();
        const {email} = this.state;
        Auth.forgotPassword(email)
            .then(data => {
                console.log(data)
                this.setState({
                    Notsubmitted: false
                })
               
            })
            .catch(error => {
                console.log(error)
                alert("Email doesn't exist ")
            })
    }

    updatePassword = async event => {
        event.preventDefault();
        const {email, code, password, confirmPassword} = this.state;
        if(password === confirmPassword){
            Auth.forgotPasswordSubmit(email, code, password)
            .then(result => {
                console.log(result)
                alert("Success!")
            })
            .catch(error => {
                // alert("there was an error: " + error)
                console.log(email)
                console.log(error)
            })
        }
        // else {alert("passwords don't match.")}
    }

    onInputChange(event) {
        const{name, value} = event.target;
        this.setState({
            [name]: value
        })
    }


    render() {
        const { Notsubmitted } = this.state;
        return(
         <div className="forgot-password-body" >
             { Notsubmitted ?
            <div className="fp-form">
                <h3>Forgot your password?</h3>
                <p>Plase enter email addres</p>

                <form onSubmit={this.forgotPasswordRequest}>
                    <input
                        input="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                        name="email"
                        required
                    />
                    <button>Submit</button>
                </form>
             </div>
            : 
            <div>
                <h1>Enter code and new password</h1>
                <form onSubmit={this.updatePassword}>
                    <input 
                        type="text"
                        placeholder="Enter code"
                        value={this.state.code}
                        onChange={this.onInputChange}
                        name="code"
                    />
                    <input 
                        type="password" 
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        name="password"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Enter Password"
                        value={this.state.confirmPassword}
                        onChange={this.onInputChange}
                        name="confirmPassword"
                        required
                    />
                    <button>Submit</button>
                </form>
            </div>
             }
         </div>

        );
    }
}


export default ForgotPassword;