// localStorage.removeItem('users');
// localStorage.removeItem('transactions');

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



export function storeHistory(transaction){
    const existingData = localStorage.getItem('transactions');
    const data =JSON.parse(existingData) || [];

    data.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(data));
}



export function updateBalance(balance,type){
    const cur = localStorage.getItem('currentUser');
    const dt = JSON.parse(cur);

    const existingData = localStorage.getItem('users');
    const data = JSON.parse(existingData);

    const updateData = data.map((user)=>{
        if(user.email === dt[0].email){
            user.balance = Number(user.balance) + Number(balance);
            
            if(type==='credit'){
                user.totalCredit = Number(user.totalCredit) + Number(balance);
            }
            else{
                user.totalDebit = Number(user.totalDebit) - Number(balance);
            }
        }
        return user;
    })
    
    const updateCur = dt.map((user)=>{
        user.balance = Number(user.balance) + Number(balance);
        if(type==='credit'){
            user.totalCredit = Number(user.totalCredit) + Number(balance);
        }
        else{
            user.totalDebit = Number(user.totalDebit) - Number(balance);
        }

        return user;
    })

    localStorage.setItem('users',JSON.stringify(updateData));
    localStorage.setItem('currentUser',JSON.stringify(updateCur));
    return true;
}