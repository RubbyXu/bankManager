import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => history.push('/')}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bank
          </Typography>
          <Button color="inherit">
            {props.userInfo.name ? props.userInfo.name : ''}
          </Button>
      
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
