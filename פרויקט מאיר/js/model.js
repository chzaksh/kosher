import * as ajax from "../../public/js/modules/ajax.js.js";
var falseCode = 0;














async function checkOld(x) { //בדיקת קוד מנהל ישן
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/getOneByPassword",
        "data": {
            "password": x,
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    result = await ajax.select(settings);
    return result
}





async function putCodeIn(x) { //מכניס קוד מנהל חדש
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/updateAdminPassword",
        "data": {
            "password": x,
            "id": "1"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}

async function updateUser(emailHold, formData) { // מכניס את הנתונים החדשים של המשתמש למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1]);
    }
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/updateUser",
        "data": {
            "email": arr[0],
            "phone": arr[2],
            "adderss": arr[1],
            "emailHold": emailHold
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}

async function emailUser(mail) { // בודק אם המייל של המשתמש קיים במערכת
    var result = null;
    var url = `https://123-61691b.appdrag.site/api/client/getOneByEmail?email=${mail}`
    result = await ajax.emailUser(url);
    return result
}

function newToken() { //מביא טוקן חדש
    var token = "token" + (Math.floor(Math.random() * 999999999) + 100000000);
    return token
}

async function userNew(formData, token) { //מכניס משתמש חדש מהטבלה של המנהל + טוקן
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1])
        console.log(input)
        console.log(arr)

    }
    console.log(arr)
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/register",
        "data": {
            "first_name": arr[0],
            "last_name": arr[1],
            "email": arr[2],
            "address": arr[3],
            "phone": arr[4],
            "password": arr[5],
            "role_id": arr[6],
            "token": token
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };

    result = await ajax.updateOrDelete(settings);
    return result
}

async function userUpdate(token, formData) { // מכניס את הנתונים החדשים של המשתמש למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1]);
    }
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/UpdatePersonalDetails",
        "data": {
            "email": arr[0],
            "phone": arr[2],
            "adderss": arr[1],
            "token": token
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}














export {
    // checkBtn,
    login,
    getfalseCode,
    checkOld,
    deleteUser,
    putCodeIn,
    getOllUsers,
    inputPassword,
    inputEmail,
    inputTel,
    falseCode,
    updateUser,
    cheksInput,
    error1,
    checkClier,
    error,
    userNew,
    emailUser,
    // checkError,
    newToken,
    userUpdate
    //     userNew,
    //     emailUser
}