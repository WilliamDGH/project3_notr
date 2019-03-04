import React, { Component } from 'react';

import Note from './Note'
import NewNote from './NewNote'

class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div className="container">
        <h1>Notr</h1>

        <div className="noteList">
          <NewNote />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>

        <div className="noteCanvas">
          <form>
            <div className="card" contenteditable="true">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
