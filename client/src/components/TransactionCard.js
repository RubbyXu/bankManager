import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { deposit, withdrawal, transfer } from '../api/api';
import { UPDATE_USER_INFO, UPDATE_ACCOUNT_INFO } from '../store/reducers';

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
  button: {
    padding: '10px',
    margin: '10px'
  }
});

function TransactionCard(props) {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [accountToBeTransfered, setAccountToBeTransfered] = useState('');

  const { accountInfo, transaction } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result
    // For the transaction type, need to use freeze object here
    switch (transaction) {
      case 'transfer':
        result = await transfer({ amount, accountInfo, accountToBeTransfered })
        break;
      case 'deposit':
        result = await deposit({ amount, accountInfo })
        break;
      case 'withdrawal':
        result = await withdrawal({ amount, accountInfo })
        break;
      default:
        break
    }

    let newAccountInfo = _.get(result, 'data');
    let errorCode = _.get(result, 'data.code');
    if (!errorCode && newAccountInfo) {
      props.updateAccountInfo(newAccountInfo)
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Transaction : {transaction}
        </Typography>

        <Typography variant="body2" component="div">
          <form onSubmit={handleSubmit}>
            <div>
              <TextField name="amount" id="amount" label="amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
              {transaction === 'transfer' ?
                <>
                  <br />
                  <TextField name="account number" id="account" label="account number" value={accountToBeTransfered} onChange={(e) => { setAccountToBeTransfered(e.target.value) }} />
                </>
                : <></>}
            </div>
            <Button type="submit" variant="outlined" className={classes.button}>SUBMIT</Button>
          </form>

        </Typography>
      </CardContent>

    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard);