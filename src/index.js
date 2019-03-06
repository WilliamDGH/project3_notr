import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import firebase from './firebase-config'

// Style CSS
import './css/index.css'
import './css/login.css'

// Page Components
import App from './components/App'
import Login from './components/Login'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

// Bootstrap Template resource
import './css/template.css'
import './ui-js/template.js'

// React Router
class Routes extends Component {
  constructor(){
    super()
    this.state = {
      user : null
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        (user)? this.setState({ user }) : this.setState({ user: null })
      }
    )
  }

  render() {
    if (this.state.user) {
      return (
        <Router>
          <div>
          <Route exact path="/" component={App} />
          </div>
        </Router>
      )
    }
    return(
      <Login />
    )
  }
}

ReactDOM.render(<Routes />, document.getElementById('root'));
