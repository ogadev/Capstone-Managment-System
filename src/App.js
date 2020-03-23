import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports'; 
import Login from './Login';
import GoogleForms from './GoogleForms';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProposalForm from './ProposalForm';
import ForgotPassword from './ForgotPassword'
import FileUpload from './FileUpload'
import Demo from './Demo'
import SignInSucc from './SignInSucc'
import ProjectProposalSubmission from './ProjectProposalSubmission'
import Preferences from './Preferences'
Amplify.configure(aws_exports)

function App() {
  return (
    <Switch>
        <Route exact path="/"> 
          <Login />
        </Route>
        <Route path="/googleforms">
          <GoogleForms />
        </Route>
        <Route path="/forgotpassword" >
          <ForgotPassword />
        </Route>
        <Route path="/fileuploadtest">
          <FileUpload />
        </Route>
        <Route path="/democards">
          <Demo />
        </Route>
        <Route path="/signout">
          <SignInSucc />
        </Route>
        <Route path ="/proposal">
          <ProjectProposalSubmission />
        </Route>
        <Route path="/demo">
          <Demo />
        </Route>
        <Route path="/preferences">
          <Preferences />
        </Route>
      </Switch>
   
  );
}

export default App;
