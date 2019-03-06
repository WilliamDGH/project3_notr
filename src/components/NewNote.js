import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  cardMain: {
    height: "100%",
    textAlign: "center"
  },
  fab: {
    margin: "0 auto",
  },
};

class NewNote extends Component {

  render(){
    const { classes } = this.props;
    return (
      <Card className="cardThumbnail"  onClick={this.props.select}>
        <CardActions className={classes.cardMain}>
          <Fab aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

NewNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewNote);
