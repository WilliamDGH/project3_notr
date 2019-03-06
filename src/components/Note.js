import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';

const styles = {
  cardMain: {
    height: "85%"
  },
  cardFooter: {
    height: "15%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Note extends Component {
  constructor(){
    super()
    this.state = {
      id : null
    }
    this.handleSelect=this.handleSelect.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount(){
    this.setState({
      id: this.props.id
    })
  }

  handleSelect () {
    this.props.select(this.state.id)
  }

  handleDelete () {
    this.props.delete(this.state.id)
  }

  render(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Card className="cardThumbnail">
        <CardContent className={classes.cardMain}>
          <Typography variant="h5" component="h6" className="note-title">
            {bull}
            {this.props.note.title}
          </Typography>
          <br />
          <Typography className="note-content" component="p">
            {this.props.note.content}
            <br />
          </Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Fab onClick={this.handleSelect} size="small" color="secondary" aria-label="Edit" className={classes.fab}>
            <EditIcon />
          </Fab>
          <Fab onClick={this.handleDelete} size="small" aria-label="Delete" className={classes.fab}>
            <DeleteIcon />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Note);
