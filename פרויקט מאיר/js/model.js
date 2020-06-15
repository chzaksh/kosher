import * as ajax from "./modules/ajax.js";
var falseCode = 0;







function inputTel(input) { //בדיקת התאמה לטלפון
    var inputTel = $(input);
    var mailformat = /[0-9-()+]{3,20}/;
    if (inputTel.val().match(mailformat) && inputTel.val().length > 7) {
        inputTel.removeClass("error");
        return true
    } else {
        inputTel.addClass("error");
        error = "Press 8 minimum numbers\n";
        return false
    }
}



// function checkError(from) {//
//     if ($(from).find('input').hasClass() == 'error') {
//         return false
//     }
// }

function getfalseCode() { // בדיקת נסינות החלפת קוד
    falseCode++;
    if (falseCode == 3) {
        falseCode = 0;
        return true;
    }
}

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

async function getOllUsers() { //מקבל את כל המשתמשים לטבלת המנהל
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/getOllUsers",
        "data": {
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.select(settings);
    return result
}

async function deleteUser(email) { //מחיקת משתמש
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/deleteUser",
        "data": {
            "email": email
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    }
    result = await ajax.updateOrDelete(settings);
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