import React, { Component } from 'react'
import firebase from './../firebase-config'

import Note from './Note'
import NewNote from './NewNote'

class App extends Component {
  constructor(){
    super()
    this.state = {
      notes : null,
      focus: null
    }
    this._selectNote = this._selectNote.bind(this);
    this._handleChangeTitle = this._handleChangeTitle.bind(this);
    this._handleChangeContent = this._handleChangeContent.bind(this);
    this._createNewNote = this._createNewNote.bind(this);
  }

  componentWillMount(){
    this._fetchNotes()
  }

  _fetchNotes(){
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.setState({ user })
          const dbref = firebase.database().ref().child(this.state.user.uid).orderByChild('timeStamp')
          dbref.on('value', snap => {
            this.setState({
              notes: snap.val()
            })
          })
        } else {
          this.setState({ user: null })
        }
      })
  }

  _selectNote (id) {
    this.setState({
      focus: id
    })
  }

  _handleChangeTitle (e) {
    if (this.state.focus !== null) {
      const dbref = firebase.database().ref().child(this.state.user.uid).child(this.state.focus);
      dbref.update({
        title: e.target.value
      })
    }
  }

  _handleChangeContent (e) {
    if (this.state.focus !== null) {
      const dbref = firebase.database().ref().child(this.state.user.uid).child(this.state.focus);
      dbref.update({
        content: e.target.value
      })
    }
  }

  _createNewNote () {
    const dbref = firebase.database().ref().child(this.state.user.uid)
    const newNote = dbref.push({
      title: "new note",
      content: "new note"
    }).key
    this.setState({
      focus : newNote
    })
  }

  _signOut(){
    firebase.auth().signOut();
  }

  render() {
    if(this.state.notes === null) {
      return(
        <div className="container">
          <h1>Loading...</h1>
        </div>)
    }
    return (
      <div className="container">
        <h1>NotR</h1>
        {(this.state.user)? <p onClick={this._signOut}>{this.state.user.email} Click to sign out</p> : ""}
        <div className="noteList">
          <NewNote select={this._createNewNote}/>
          {this.state.notes !== null && Object.keys(this.state.notes).reverse().map((key)=>{
            return <Note select={this._selectNote} key={key} id={key} note={this.state.notes[key]}/>
          })}
        </div>

        <div className="noteCanvas">
          <textarea className="card" onChange={this._handleChangeTitle} value={(this.state.notes === null || this.state.focus === null)? ("") : (this.state.notes[this.state.focus].title)}></textarea>
          <textarea className="card" onChange={this._handleChangeContent} value={(this.state.notes === null || this.state.focus === null)? ("") : (this.state.notes[this.state.focus].content)}></textarea>
        </div>
      </div>
    );
  }
}

export default App;
