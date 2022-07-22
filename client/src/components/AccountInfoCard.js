import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

function AccoundInfoCard(props) {
  const classes = useStyles();
  const { accountInfo } = props;


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Account Information
        </Typography>
 
        <Typography variant="body2" component="p">
          Account Number: {accountInfo.accountId}
          <br />
          Balance: {accountInfo.balance}
        </Typography>
      </CardContent>
  
    </Card>
  );
}
const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    accountInfo: state.accountInfo
  })
  const mapDispatchToProps = null
  
  export default connect(mapStateToProps, mapDispatchToProps)(AccoundInfoCard);