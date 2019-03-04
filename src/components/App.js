import React, { Component } from 'react'
import firebase from './../firebase-config'

import Note from './Note'
import NewNote from './NewNote'

class App extends Component {
  constructor(){
    super()
    this.state = {
      notes : null,
      focus: 0
    }
    this._selectNote = this._selectNote.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentWillMount(){
    this._fetchNotes()
  }

  _fetchNotes(){
    const dbref = firebase.database().ref().child('notes')
    dbref.on('value', snap => {
      this.setState({
        notes: snap.val()
      })
    })
  }

  _selectNote (id) {
    this.setState({
      focus: id
    })
  }

  _handleChange (e) {
    const dbref = firebase.database().ref().child('notes').child(this.state.focus);
    dbref.update({
      content: e.target.value
    })
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

        <div className="noteList">
          <NewNote />
          {this.state.notes !== null && this.state.notes.map((n)=>{
            return <Note select={this._selectNote} key={n.id} note={n}/>
          })}
        </div>

        <div className="noteCanvas">
          <form>
            <textarea className="card" onChange={this._handleChange} value={(this.state.notes === null)? ("") : (this.state.notes[this.state.focus].content)}></textarea>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
