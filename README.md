# Banker Management Project 
# Setup
- Run `git clone https://github.com/kathydingcn/bankManager.git`
- Run `cd bankManager`
- Run `docker-compose -f docker-compose.yml up`
- Open your browser, input 'http://localhost/' in URL address. 

# Functions
- Register new user 
    - If the user does not exist, then create it, the user account will be created automatically. 
    - If the user already exists, report error. 
- Login existing user
    - If the user exist and password input is correct, then login will succeed. Otherwise, it will report error. 
- Query account information
- Do transaction for account, including deposit, withdrawal, and transfer money. 
- Admin could query all account information. 

# Known bugs
- When transfer money to another account, if the account does not exist, frontend does not reponse. (just found it, have no time to fix.)
- Write the code in rush, some errors are not handled. 

# Need to Improve
- Test cases are not developed. 
- Environment variables are not used, did not diff the running environment. 
- Authenticate method is too simple. Use cookie-session method to authenticate, but still have not install session related, server only check the cookie name.
- To keep the data in DB permanently, need to add volumns mount in docker-compose file, like below. Otherwise, the data will get lost after container is restarted.
```
    volumes:
      - ./mongodata:/data/db
```
- List all accounts functions(Admin button) are not authenticated.
- Lint is not used. 
- Password is not encrypted(might use bcrypt to encrypt)


