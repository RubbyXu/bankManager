import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonAppBar from './Bar';
import { register, login, getAccounts } from '../api/api';
import { UPDATE_USER_INFO, UPDATE_ACCOUNT_INFO, ADD_ACCOUNTS } from '../store/reducers';


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  loginFrame: {
    marginTop: '10%',

  },
  button: {
    padding: '10px',
    margin: '10px'
  }
}));

function Register(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dialogIsOpen, setDialogOpen] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestError, setRequestError] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {

  }, [])

  // A little messy, need to do some improvement later
  const handleSubmit = async (e) => {
    e.preventDefault();

    let result
    if (requestName === 'register') {
      result = await register({ name, email, password });
      setDialogOpen(true)
    } else if (requestName === 'login') {
      result = await login({ name, email, password });
      setDialogOpen(true)
    } else {
      result = await getAccounts();
      let accounts = _.get(result, 'data', [])
      props.loadAccounts(accounts);
      history.push("/admin")
    }
    const accountInfo = _.get(result, 'data.data.account', {})
    const userInfo = _.get(result, 'data.data.user', {})
    const errorCode = _.get(result, 'data.code', false)

    setRequestError(errorCode !== 0 ? errorCode : false)
     
    if (!errorCode) {
      props.updateUserInfo(userInfo)
      props.updateAccountInfo(accountInfo)
    }
  }

   

  const handleDialogClose = () => {
    setDialogOpen(false)
    if (requestError) {
      history.push("/")
    } else {
      history.push("/home")
    }

  }


  return (
    <div className={classes.root}>
      <ButtonAppBar />
      <Grid container justifyContent="center" className={classes.loginFrame} >
        <Card style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField name="name" id="name" label="name" value={name} onChange={(e) => { setName(e.target.value) }} />
              <br />
              <TextField name="email" id="email" label="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              <br />
              <TextField name="password" id="password" label="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <br />
            </div>
            <Button type="submit" variant="outlined" id="register" onClick={() => setRequestName('register')} className={classes.button}>REGISTER</Button>
            <Button type="submit" variant="outlined" id="login" onClick={() => setRequestName('login')} className={classes.button}>LOGIN</Button>
            <Button type="submit" variant="outlined" id="admin" onClick={() => setRequestName('admin')} className={classes.button}>ADMIN</Button>
          </form>
          <Dialog onClose={() => setDialogOpen(true)} aria-labelledby="simple-dialog-title" open={dialogIsOpen}>
            <DialogTitle id="simple-dialog-title">{requestError ? <> {requestName} failed. Reason: {requestError}</> : <>{requestName} succeed</>}</DialogTitle>
            <Button variant="outlined" onClick={() => handleDialogClose()}>OK</Button>
          </Dialog>

        </Card>
      </Grid>

    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})
const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (data) => dispatch({ type: UPDATE_USER_INFO, payload: data }),
  updateAccountInfo: (data) => dispatch({ type: UPDATE_ACCOUNT_INFO, payload: data }),
  loadAccounts: (data) => dispatch({ type: ADD_ACCOUNTS, payload: data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
