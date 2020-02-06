import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports'; 
import Login from './Login';
import GoogleForms from './GoogleForms';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

Amplify.configure(aws_exports)

function App() {
  return (
    <switch>
        <Route exact path="/" component ={Login} />
        <Route exact path="/googleforms" component={GoogleForms} />
      </switch>
  );
}

export default App;
