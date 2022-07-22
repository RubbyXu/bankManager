const express = require('express')
const Router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { insertData, queryData } = require('../mongodb/dbOperations')
const userCollection = 'users'
const accountCollection = 'accounts'
/**
 * If user does not exist, then add user, and create account for this user
 */
Router.post('/register', async function (req, res) {
    const { name, email, password } = req.body;
    let result;
    try {
        result = await queryData(userCollection, { email })
        if (result.length) {
            return res.send({ code: 'USER_EXIST' })
        }
        // Need encrypt password, do it later
        const userId = await insertData(userCollection, { name, email, password });
        const balance = 0;
        const accountId = uuidv4();
        await insertData(accountCollection, { userId, accountId, balance });

        return res.send({ code: 0, data: { account: { accountId, balance }, user: { userId, name, email } } })
    } catch (e) {
        return res.send({ code: 'SERVER_ERROR' })
    }


})

/**
* Validate user credentials 
*/
Router.post('/login', async function (req, res) {
    const { name, email, password } = req.body;

    let result;
    let accountInfo;
    let accountId;
    let balance;
    let userId;
    try {
        let options = {
            maxAge: 1000 * 60 * 150, // would expire after 150 minutes
            httpOnly: true,

        }
        result = await queryData(userCollection, { email })
        if (!result.length) {
            return res.send({ code: 'USER_NOT_EXIST' })
        }
        if(result[0].password !== password){
            return res.send({ code: 'PASSWORD_INCORRECT' })
        }
        userId = result[0]._id;
        accountInfo = await queryData(accountCollection, { userId })

        accountId = accountInfo[0].accountId;
        balance = accountInfo[0].balance;
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        // set cookie, need to improve by using cookie-session later
        res.cookie('cookieName', randomNumber, options);
         
        return res.send({ code: 0, data: { account: { accountId, balance }, user: { userId, name, email } } })

    } catch (e) {
        return res.send({ code: 'SERVER_ERROR' })
    }


})



module.exports = Router
