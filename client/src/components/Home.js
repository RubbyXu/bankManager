import '../App.css';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { UPDATE_USER_INFO, UPDATE_ACCOUNT_INFO } from '../store/reducers';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './Bar';
import AccoundInfoCard from './AccountInfoCard';
import TransactionCard from './TransactionCard';
import { transactions } from '../common/types'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  transactionsFrame:{
    marginTop: 40
  },
  button: {
    padding: '10px',
    margin: '10px'
  }
}));

function Home() {

  const classes = useStyles()

  useEffect(() => {
     
  }, [])

 
  return (
    <div className={classes.root}>
      <ButtonAppBar />
      <Grid container>
        <Grid item xs={12}>
          <AccoundInfoCard />
        </Grid>
        <Divider />
        <Grid item xs={12} className={classes.transactionsFrame}>
          <Grid container justifyContent="center" spacing={10}>

            {transactions.map((transaction) => (
              <Grid key={transaction} item>
                <TransactionCard transaction={transaction} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  accountInfo: state.accountInfo
})
const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (data) => dispatch({ type: UPDATE_USER_INFO, payload: data }),
  updateAccountInfo: (data) => dispatch({ type: UPDATE_ACCOUNT_INFO, payload: data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
