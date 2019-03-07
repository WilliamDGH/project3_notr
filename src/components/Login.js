import React, { Component } from 'react'
import firebase from './../firebase-config'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this._handleChange = this._handleChange.bind(this)
    this._login = this._login.bind(this)
    this._signup = this._signup.bind(this)
  }

  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        this.setState({ message : error.message })
      });
  }

  _signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      const user = firebase.auth().currentUser;
      firebase.database().ref().child(user.uid).push({
        title: `Welcome ${user.email}`,
        content: "Create your first note",
        uid: user.uid
      })
    })
    .catch((error) => {
        this.setState({ message : error.message })
      })
  }

  render() {
    return(
      <div className="container">
        <div className="sidenav">
           <div className="login-main-text">
              <h2>NotR<br /> Login/Signup</h2>
              <p>Login or register from here to access.</p>
           </div>
        </div>
        <div className="main">
           <div className="col-md-6 col-sm-12">
              <div className="login-form">
                 <form>
                    <div className="form-group">
                       <label>Email</label>
                       <input value={this.state.email} onChange={this._handleChange} name="email" type="email" className="form-control" placeholder="Email.." />
                    </div>
                    <div className="form-group">
                       <label>Password</label>
                       <input value={this.state.password} onChange={this._handleChange} name="password" type="password" className="form-control" placeholder="Password.." />
                    </div>
                    <button onClick={this._login} className="btn btn-black">Login</button>
                    <button onClick={this._signup} className="btn btn-secondary">Register</button>
                 </form>
                 <p>{this.state.message}</p>
              </div>
           </div>
        </div>
      </div>
    )
  }
}
