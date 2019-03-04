import React, { Component } from 'react'

export default class Note extends Component {
  constructor(){
    super()
    this.state = {
      note : {}
    }
    this.handleSelect=this.handleSelect.bind(this)
  }

  componentWillMount(){
    this.setState({
      note: this.props.note
    })
  }

  handleSelect () {
    this.props.select(this.state.note.id)
  }
  render () {
    return(
      <div className="cardThumbnail" onClick={this.handleSelect}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.note.title}</h5>
            <p className="card-text">
              {this.props.note.content}
            </p>
          </div>
        </div>
    </div>
    )
  }
}
