import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { Auth } from 'aws-amplify'


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

// const Routes = () => (
//   <Router>
//     <Switch>
//       <Route path='/auth' component={Authenticator} />
//       <PrivateRoute path='/route1' component={Route1} />
//       <PrivateRoute path='/' component={Home} />
//     </Switch>
//   </Router>
// )