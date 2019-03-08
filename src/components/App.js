import React, { Component } from 'react'
import firebase from './../firebase-config'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Note from './Note'
import NewNote from './NewNote'
import MenuAppBar from './MenuAppBar'

const styles = {
  noteField: {
    margin: "0 auto",
    width: "100px"
  },
};

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
    this._deleteNote = this._deleteNote.bind(this);
  }

  componentDidMount(){
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
      content: "new note",
      uid: this.state.user.uid
    }).key
    this.setState({
      focus : newNote
    })
  }

  _deleteNote (id) {
    const dbref = firebase.database().ref().child(this.state.user.uid).child(id)
    dbref.remove()
  }

  render() {
    const { classes } = this.props;
    if(this.state.notes === null) {
      return(
        <div className="container">
          <h1>Loading...</h1>
        </div>)
    }
    return (
      <div className="container">
        <MenuAppBar user={this.state.user}/>
        <div className="noteList">
          <NewNote select={this._createNewNote}/>
          {this.state.notes !== null && Object.keys(this.state.notes).reverse().map((key)=>{
            return <Note delete={this._deleteNote} select={this._selectNote} key={key} id={key} note={this.state.notes[key]}/>
          })}
        </div>

        <div className="noteCanvas">
          <Paper elevation={1}>
            <div className="field">
            <TextField placeholder="title" className={classes.noteField} onChange={this._handleChangeTitle} value={(this.state.notes === null || this.state.focus === null)? ("") : (this.state.notes[this.state.focus].title)}/>
            </div>
            <div className="field">
            <TextField placeholder="content" fullWidth="true" multiline className="card" onChange={this._handleChangeContent} value={(this.state.notes === null || this.state.focus === null)? ("") : (this.state.notes[this.state.focus].content)} />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
