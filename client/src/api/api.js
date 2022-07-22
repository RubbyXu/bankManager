import httpClient from "./httpClient";

export async function getAccount(id) {   
    const result = await httpClient.get(`/api/account/${id}`)
    return result;
}

export async function getAccounts(id) {   
    const result = await httpClient.get(`/api/account/accounts`)
    return result;
}

export async function createAccount(data) {  

    const result = await httpClient.post('/api/account', data)
    return result;
}


export async function deposit(data) {  

    const result = await httpClient.post('/api/account/deposit', data)
    return result;
}

export async function withdrawal(data) {  
    const result = await httpClient.post('/api/account/withdrawal', data)
    return result;
}
export async function transfer(data) {  
    const result = await httpClient.post('/api/account/transfer', data)
    return result;
}

export async function register(data) {  
    const result = await httpClient.post('/api/user/register', data)
    return result;
}

export async function login(data) {   
    const result = await httpClient.post('/api/user/login', data)
    return result;
}