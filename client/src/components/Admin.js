import '../App.css';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ButtonAppBar from './Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  tableFrame: {
    padding: 40
  },
  table: {
    minWidth: 650,
  },
}));

const tableTitles = ['Customer Name', 'Customer Info', 'Account ID', 'Balance']
function Admin(props) {

  const classes = useStyles();
  const { accounts } = props;
  useEffect(() => {
  }, [])

  return (
    <div className={classes.root}>
      <ButtonAppBar />
      <Grid container justifyContent="center" className={classes.tableFrame}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="accounts table">
            <TableHead>
              <TableRow >
                {tableTitles.map(title => (<TableCell key={title}>{title}</TableCell>))}

              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.accountId}>
                  <TableCell component="th" scope="row">
                    {account.name}
                  </TableCell>
                  <TableCell align="right">{account.email}</TableCell>
                  <TableCell align="right">{account.accountId}</TableCell>
                  <TableCell align="right">{account.balance}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>

    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  accounts: state.accounts
})
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
