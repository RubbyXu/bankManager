const express = require('express')
const Router = express.Router()
const { updateData, queryData } = require('../mongodb/dbOperations')
const _ = require('lodash')

// Need to improve, need to put to a separate file
const userCollection = 'users'
const accountCollection = 'accounts'

/**
 * Get accounts information 
 */

Router.get('/accounts', async function (req, res) {
    try{
        let accountResults = await queryData(accountCollection, {})
        let userResults = await queryData(userCollection, {})
    
        let results = []
        // Combine two collections data
        accountResults.forEach((account) => {
            let _user = userResults.find(user => account.userId.toString()  === user._id.toString()  )
            results.push({name: _user.name, email: _user.email, accountId: account.accountId, balance: account.balance})
        })
        
        res.send(results)
    }catch(e){
        res.send({ code: 'LOAD_ACCOUNTS_FAILED' })
    }


})

Router.post('/deposit', async function (req, res) {
    const { accountInfo, amount } = req.body;
    try {
        let result = await dealWithTransaction(accountInfo, amount, 'deposit');
        res.send(result)

    } catch (e) {
        res.send({ code: 'DEPOSIT_FAILED' })
    }

})

Router.post('/withdrawal', async function (req, res) {
    const { accountInfo, amount } = req.body;
    try {
        let result = await dealWithTransaction(accountInfo, amount, 'withdrawal');
        res.send(result)
    } catch (e) {
        res.send({ code: 'WITHDRAWAL_FAILED' })
    }


})
const dealWithTransaction = (accountInfo, amount, type, accountToBeTransfered = null) => {

    return new Promise(async (resolve) => {
        const accountId = _.get(accountInfo, 'accountId', null)
        try {
            let result = await queryData(accountCollection, { accountId })

            if (result.length || !accountId) {
                let account = result.find((item) => accountId === item.accountId);
                const _id = account._id;
                switch (type) {
                    case 'withdrawal':
                        account.balance = parseFloat(account.balance) - parseFloat(amount);
                        break;
                    case 'deposit':
                        account.balance = parseFloat(account.balance) + parseFloat(amount);
                        break;
                    case 'transfer':

                        let queryResult = await queryData(accountCollection, { accountId: accountToBeTransfered })
                        // Need more validation here, e.g. compare user name then transfer
                        if (!queryResult.length) {
                            return resolve({ code: 'ACCOUNT_NOT_EXIST' })
                        }
                        let accountTransfered = queryResult[0]
                        accountTransfered.balance = parseFloat(accountTransfered.balance) + parseFloat(amount);
                        account.balance = parseFloat(account.balance) - parseFloat(amount);
                        let _transferId = accountTransfered._id;

                        await updateData(accountCollection, _transferId, accountTransfered)

                        break;
                    default:
                        break
                }

                await updateData(accountCollection, _id, account)
                return resolve({ accountId, balance: account.balance })
            }
            return resolve({ code: 'ACCOUNT_NOT_EXIST' })
        } catch (e) {
            console.log('Error', e)
            return resolve({ code: 'TRANSACTION_FAILED' })
        }
    })
}

/**
 * Transfer money to another account
 */
Router.post('/transfer', async function (req, res) {
    const { amount, accountInfo, accountToBeTransfered } = req.body;
    if (!amount || !accountInfo || !accountToBeTransfered) {
        res.send({ code: 'TRANSFERED_INFO_NOT_ENOUGH' })
    }
    try {
        let result = await dealWithTransaction(accountInfo, amount, 'transfer', accountToBeTransfered)
        res.send(result)
    } catch (e) {
        res.send({ code: 'TRANSACTION_FAILED' })
    }

})
module.exports = Router
