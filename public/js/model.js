let error = "error:\n";

function error1() { //ריקון שגיאה
  error = "error:\n";
}

function checkSelect(input) {
  const select = $(input)
  if (select.val() == "") {
    select.addClass('is-invalid')
    return false
  } else {
    select.removeClass("is-invalid");
    select.addClass("is-valid");
    return true
  }
}

function objectKeys(body) {
  const data = Object.keys(body).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
  }).join('&');
  return data
}

function checkClier(from) { //בדיקת תאי אינפוט ריקים
  const arrayFrom = from.find('input');
  let ans = 0;
  $(arrayFrom).each(function (i) {
    if ($(this).val() == "") {
      $(this).addClass("is-invalid")
      ans++
    } else {
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
    }
  })
  if (ans == 0) {
    return true
  } else {
    error += "You must fill in all fields\n";
  }
}

function inputEmail(input) { //בדיקת התאמה למייל
  const email = $(input);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;;
  if (email.val().match(mailformat)) {
    email.removeClass("is-invalid");
    email.addClass("is-valid");
    return true
  } else {
    error += "Mail should be written correctly.\n";
    email.addClass("is-invalid");
    return false
  }
}

function inputTel(input) { //בדיקת התאמה לטלפון
  var inputTel = $(input);
  var mailformat = /[0-9-()+]{3,20}/;
  if (inputTel.val().match(mailformat) && inputTel.val().length > 7) {
    inputTel.removeClass("is-invalid");
    inputTel.addClass("is-valid");
    return true
  } else {
    inputTel.addClass("is-invalid");
    error = "Press 8 minimum numbers\n";
    return false
  }
}

function inputPassword(input) {
  var inputPassword = $(input);
  var mailformat = /[0-9-()+]{3,20}/; //להוסיף בדיקות סיסמה חזקות
  // (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}
  if (inputPassword.val().match(mailformat)) {
    inputPassword.removeClass("is-invalid");
    inputPassword.addClass("is-valid");
    return true
  } else if ($(inputPassword).length > 0) {
    $(inputPassword).addClass("is-invalid");
    error += "the password can be only numbers.\n"
    return false
  }
}

async function putDB(url, method, data) {
  console.log(`http://localhost:3000/${url}`)
  response = await fetch(`http://localhost:3000/${url}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: method,
    body: data,
  });
  if (response.status == "OK" && response.affectedRows == 1) {
    result = true
    console.log(response, 132)
    console.log(result)
}
  
}



export {
  error1,
  checkClier,
  inputEmail,
  inputTel,
  inputPassword,
  checkSelect,
  objectKeys,
  putDB
}