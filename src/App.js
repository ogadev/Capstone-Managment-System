import React from 'react';
import ProtectedRoute from "./protectedRoute"
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
import DashBoard from './DashBoard'
Amplify.configure(aws_exports)


/*************************************************************************
 This is the brains of the project. Protected routes are the ones that need
 authentication 
***************************************************************************/


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
        <ProtectedRoute path ="/proposal" component={ProjectProposalSubmission}>
     
        </ProtectedRoute>
        <Route path="/demo">
          <Demo />
        </Route>
        <ProtectedRoute path="/preferences" component={Preferences}/>

        <ProtectedRoute path="/home" component={DashBoard}/>

      </Switch>
   
  );
}

export default App;
