import React, { Component } from 'react'

export default class NewNote extends Component {
  _createNewNote(){
    this.props.select()
  }
  render () {
    return(
      <div onClick={this.props.select} className="cardThumbnail">
        <div className="card">
          <div className="card-body">
            <h5>+</h5>
          </div>
        </div>
      </div>
    )
  }
}
