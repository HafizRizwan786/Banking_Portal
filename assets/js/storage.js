// localStorage.removeItem('users');
// localStorage.removeItem('transactions');

// For storing the newly generated User data (Sign Up)
export function storeData(user) {

    const existingData = localStorage.getItem('users');
    const data = existingData ? JSON.parse(existingData) : [];

    const userExists = data.some(existingUser => existingUser.email === user.email);
    if (userExists) {
        alert("An account with this email already exists!");
        return false;
    }

    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));
    
    alert("User registered successfully!");
    return true;
}



// Validate the User for Login
export function validateUser(email,password){
    const existingData = localStorage.getItem('users');
    const data = JSON.parse(existingData) || [];
    const res=data.some(user => user.email===email && user.password===password);

    if(res){
        const user = data.filter(user => user.email===email && user.password===password);
        localStorage.setItem('currentUser',JSON.stringify(user));
        return true;
    }

    return false;
}



// For saving the new selected image by the user
export function UpdateImage(img){
    const existData = localStorage.getItem('users');
    const data = JSON.parse(existData);

    const existCur=localStorage.getItem('currentUser');
    const curr=JSON.parse(existCur);

    const update = data.map((user)=>{
        if(user.email===curr[0].email){
            user.image=img;
        }
        return user;
    });

    const updateCurr=curr.map((user)=>{
        user.image=img;
        return user;
    })


    localStorage.setItem('currentUser',JSON.stringify(updateCurr));
    localStorage.setItem('users',JSON.stringify(update));
}



// For storing the transaction history
export function storeHistory(transaction){
    const existingData = localStorage.getItem('transactions');
    const data =JSON.parse(existingData) || [];

    data.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(data));
}



// For updating the Balance (Credit or Debit) of the user in the user storage when user make transaction
export function updateBalance(balance,type){
    const cur = localStorage.getItem('currentUser');
    const dt = JSON.parse(cur);

    const existingData = localStorage.getItem('users');
    const data = JSON.parse(existingData);

    const updateData = data.map((user)=>{
        if(user.email === dt[0].email){
            if(type==='credit'){
                user.balance = Number(user.balance) + Number(balance);
                user.totalCredit = Number(user.totalCredit) + Number(balance);
            }
            else{
                user.balance = Number(user.balance) - Number(balance);
                user.totalDebit = Number(user.totalDebit) + Number(balance);
            }
        }
        return user;
    })
    
    const updateCur = dt.map((user)=>{
        if(type==='credit'){
            user.balance = Number(user.balance) + Number(balance);
            user.totalCredit = Number(user.totalCredit) + Number(balance);
        }
        else{
            user.balance = Number(user.balance) - Number(balance);
            user.totalDebit = Number(user.totalDebit) + Number(balance);
        }

        return user;
    })

    localStorage.setItem('users',JSON.stringify(updateData));
    localStorage.setItem('currentUser',JSON.stringify(updateCur));
    return true;
}