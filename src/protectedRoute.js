import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { Auth } from 'aws-amplify'


/*************************************************************************
Security: with this only authenticated users can access certain pages
what you have to do is that you wrap components in app.js and if the user is 
not authenticated it will be send to the login page. 
***************************************************************************/

class ProtectedRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false
  }
  componentDidMount() {
    this.authenticate()
    
  }
 
  authenticate() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.setState({ loaded: true, isAuthenticated: true })
      })
      .catch(() => {
        this.setState({isAuthenticated: false})
        this.props.history.push('/')
      })
  }
  render() {
    const { component: Component, ...rest } = this.props
    const { loaded , isAuthenticated} = this.state
    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }}
      />
    )
  }
}

export default withRouter(ProtectedRoute)

