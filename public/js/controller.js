import * as view from "./view.js";
import * as model from "./model.js";



export function init() {
  view.removeSVG();
  view.getZmanimPlc();
  // sercheprivate();
  // sercheHome();
}





(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing




  async function search(form, root) {
    //     console.log(root)
    const country = $(form).find('#state').val();
    const city = $(form).find('#city').val();
    const hotel = $(form).find('#hotel').val();
    const lights = $(form).find('#lights').is(":checked")
    const air = $(form).find('#air-conditioner').is(":checked")
    const door = $(form).find('#door').is(":checked")
    const chabad = $(form).find('#chabad').is(":checked")
    const foodKosher = $(form).find('#foodKosher').is(":checked")
    const freezer = $(form).find('#freezer').is(":checked")
    const airuve = $(form).find('#airuve').is(":checked")
    const star = $(form).find('#star').val()
    const rating = $(form).find('#rating').val()
    const response = await getSearch(root, country, city, hotel, lights, air, door, freezer, chabad, foodKosher, airuve, star, rating);


  }

  $('#sercheprivate').on('submit', async function (e) {
    e.preventDefault();
    await search($(this), 'http://localhost:3000/private-house/search')
  })

  $('#sercheHome').on('submit', async function (e) {
    e.preventDefault();
    await search($(this), 'http://localhost:3000/home-page/search')
  })


  async function getSearch(root, country, city, hotel, lights, air, door, freezer, chabad, foodKosher, airuve, star, rating) {
    const url = new URL(root);
    if (country) {
      url.searchParams.append('country', country)
    }
    if (city) {
      url.searchParams.append('city', city)
    }
    if (hotel) {
      url.searchParams.append('hotel', hotel)
    }
    if (lights) {
      url.searchParams.append('lights', lights)
    }
    if (air) {
      url.searchParams.append('air', air)
    }
    if (door) {
      url.searchParams.append('door', door)
    }
    if (freezer) {
      url.searchParams.append('freezer', freezer)
    }
    if (chabad) {
      url.searchParams.append('chabad', chabad)
    }
    if (foodKosher) {
      url.searchParams.append('foodKosher', foodKosher)
    }
    if (airuve) {
      url.searchParams.append('airuve', airuve)
    }
    if (star) {
      url.searchParams.append('star', star)
    }
    if (rating) {
      url.searchParams.append('rating', rating)
    }
    window.location = url.toString()


  }

  $("#signUpForm, #signInForm, #contact-us, #newHotelsForm, #advertising, #newHouseForm").on('submit', function (e) {
    e.preventDefault(); //מבטל מחיקה של הטופס
    console.log(3333333333)
    const formID = this.id


    submit($(this), formID)
  })

  // $('input').on('change', function(e){

  // })





  async function submit(form, formID) { //שליחת טופס לוגין לבדיקה
    let nameForm = await checkNameForm(form, formID)
    model.error1() //מורקן את הודעת השגיאה
    console.log(nameForm)

    // if (nameForm) {
    //   console.log(true)
    // } else {
    //   console.log(false)
    // }

  }


  async function checkNameForm(form, formID) {
    // const fromData = new FormData()
    let response = false
    let method = 'put'
    let data = null
    let url = null
    let body = null

    if (formID == 'signUpForm' || formID == 'signInForm') {
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputPassword('#password')) {
        if (formID == 'signUpForm') {
          // fromData.append('firstName', $('#firstName').val())
          // fromData.append('email', $('#email').val())
          // fromData.append('password', $('#password').val())
          body = {
            "userName": $('#userName').val(),
            "email": $('#email').val(),
            "id_3": 3,
            "password": $('#password').val(),
          }
          url = 'auth/sign-up'
        } else {
          // fromData.append('email', $('#email').val())
          // fromData.append('password', $('#password').val())
          method = 'post'
          body = {
            "email": $('#email').val(),
            "password": $('#password').val(),
          }
          url = 'auth/sign-in'
        }
        data = model.objectKeys(body)
      }
    }
    if (formID === 'contact-us') { //להוסיף טקסט אקסטרה
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
        // fromData.append('firstName', $('#firstName').val())
        // fromData.append('lastName', $('#lastName').val())
        // fromData.append('email', $('#email').val())
        // fromData.append('phone', $('#phone').val())
        // fromData.append('textarea', $('#textarea').val())
        body = {
          "firstName": $('#firstName').val(),
          "lastName": $('#lastName').val(),
          "email": $('#email').val(),
          "phone": $('#phone').val(),
          "textarea": $('#textarea').val()
        }
        data = model.objectKeys(body)
        url = 'admin/contact-us'

        // login(fromData)
        // response = await fetch('http://localhost:3000/auth/contact-us', {
        //   method: 'put',
        //   body: fromData
        // })
        // if (response) {
        //   console.log(response)
        //   // view.ok()
        // }
      }
    }
    if (formID == 'newHotelsForm') {
      if (model.inputEmail('#email') && model.checkClier($('#urlDiv'))) {
        // fromData.append('hotel', $('#hotel').val())
        // fromData.append('lights', $('#lights').is(":checked"))
        // fromData.append('air-conditioner', $('#air-conditioner').is(":checked"))
        // fromData.append('door', $('#door').is(":checked"))
        // fromData.append('chabad', $('#chabad').is(":checked"))
        // fromData.append('foodKosher', $('#foodKosher').is(":checked"))
        // fromData.append('freezer', $('#freezer').is(":checked"))
        // fromData.append('airuve', $('#airuve').is(":checked"))
        // fromData.append('email', $('#email').val())
        // fromData.append('phoneContent', $('#phoneContent').val())
        // fromData.append('textarea', $('#textarea').val())
        // fromData.append('state', $('#state').val())
        // fromData.append('city', $('#city').val())
        // fromData.append('guest', $('#guest').val())
        // fromData.append('phone', $('#phone').val())
        // fromData.append('url', $('#url').val())
        // fromData.append('address', $('#address').val())
        body = {
          "hotel": $('#hotel').val(),
          "lights": $('#lights').is(":checked"),
          "airConditioner": $('#air-conditioner').is(":checked"),
          "door": $('#door').is(":checked"),
          "chabad": $('#chabad').is(":checked"),
          "foodKosher": $('#foodKosher').is(":checked"),
          "freezer": $('#freezer').is(":checked"),
          "airuve": $('#airuve').is(":checked"),
          "email": $('#email').val(),
          "phoneContent": $('#phoneContent').val(),
          "textarea": $('#textarea').val(),
          "state": $('#state').val(),
          "city": $('#city').val(),
          "guest": $('#guest').val(),
          "phone": $('#phone').val(),
          "url": $('#url').val(),
          "address": $('#address').val(),
          "plece": $('input[name=ple]:checked').val()
        }
        data = model.objectKeys(body)
        url = 'admin/new-Hotels'

      }
    }
    if (formID == 'advertising') {
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
        // fromData.append('firstName', $('#firstName').val())
        // fromData.append('lastName', $('#lastName').val())
        // fromData.append('email', $('#email').val())
        // fromData.append('phone', $('#phone').val())
        // fromData.append('url', $('#url').val())
        // fromData.append('manuy', $('input[name=manuy]:checked').val())

        body = {
          "firstName": $('#firstName').val(),
          "lastName": $('#lastName').val(),
          "email": $('#email').val(),
          "url":$('#url').val(),
          "phone": $('#phone').val(),
          "manuy": $('input[name=manuy]:checked').val(),
        }
        data = model.objectKeys(body)
        url = 'admin/new-Add'
      }
    }
    if (formID == 'newHouseForm') {
      if (model.checkSelect('#state') && model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
        // fromData.append('firstName', $('#firstName').val())
        // fromData.append('lastName', $('#lastName').val())
        // fromData.append('email', $('#email').val())
        // fromData.append('phone', $('#phone').val())
        // fromData.append('hotel', $('#hotel').val())
        // fromData.append('state', $('#state').val())
        // fromData.append('city', $('#city').val())
        // fromData.append('guest', $('#guest').val())
        // fromData.append('address', $('#address').val())
        // fromData.append('textarea', $('#textarea').val())
        // fromData.append('plece', $('input[name=ple]:checked').val())
        // fromData.append('manuy', $('input[name=manuy]:checked').val())
        body = {
          "firstName": $('#firstName').val(),
          "lastName": $('#lastName').val(),
          "hotel": $('#hotel').val(),
          "lights": $('#lights').is(":checked"),
          "airConditioner": $('#air-conditioner').is(":checked"),
          "door": $('#door').is(":checked"),
          "chabad": $('#chabad').is(":checked"),
          "foodKosher": $('#foodKosher').is(":checked"),
          "freezer": $('#freezer').is(":checked"),
          "airuve": $('#airuve').is(":checked"),
          "email": $('#email').val(),
          "textarea": $('#textarea').val(),
          "state": $('#state').val(),
          "city": $('#city').val(),
          "guest": $('#guest').val(),
          "phone": $('#phone').val(),
          "address": $('#address').val(),
          "manuy": $('input[name=manuy]:checked').val(),
          "plece": $('input[name=ple]:checked').val()

        }
        data = model.objectKeys(body)
        url = 'admin/new-House'

      }
    }
    if (url != null) {
      response = await fetch(`http://localhost:3000/${url}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: method,
        body: data,
      });
      // console.log(a)
      console.log(`http://localhost:3000/${url}`)

    }


    return response
  }

  // processFile(imageInput) {
  //   if (imageInput.files[0]) {
  //     const file: File = imageInput.files[0];
  //     var pattern = /image-*/;

  //     if (!file.type.match(pattern)) {
  //       alert('Invalid format');
  //       return;
  //     }

  //     // here you can do whatever you want with your image. Now you are sure that it is an image
  //   }
  // }

  // function isFileImage(file) {

  //   const acceptedImageTypes = ['image/jpg', 'image/png'];
  //   console.log(file && acceptedImageTypes.includes(file['type']))
  //   return file && acceptedImageTypes.includes(file['type'])
  // }

  function login(formData) { //כניסה למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
      arr.push(input[1])
      console.log(arr)
    }

    // var settings = {
    //   "url": "https://123-61691b.appdrag.site/api/client/login",
    //   "data": {
    //     "firstName": arr[0],
    //     "lastName":arr[1],
    //     "emeil": arr[2],
    //     "phone": arr[3],
    //      "text": arr[4]
    //     "AD_PageNbr": "1",
    //     "AD_PageSize": "500"
    //   },
    //   "method": "POST",
    //   "async": true,
    //   "crossDomain": true,
    //   "processData": true
    // };
    // return settings
  }










  function cheksInput(email, password) { //בדיקת אינפוט מייל, קוד

    if (inputEmail(email) && inputPassword(password)) {
      return true
    }
  }

  async function user(x) { //בדיקה של טופס לוגין מול הדטה בייס
    var result = await login(x); //שליחה לדטה בייס
    if (result) { //תשובה חיובית
      setTimeout(function () {
        view.welcome(result.first_name, result.role_id); //שולח שם משתמש לחלק העליון של העמוד
        if (result.role_id == 1) { //בדיקה אם נכנס מנהל
          admin1(); //פונקציות מנהל
          admin2();
        } else {
          client(result.token);
        }
      }, 1000)
    } else { //תשובה שלילית 
      view.playSound("no");
      setTimeout(function () {
        chckFalseCode(); //בדיקה כמה פעמים הקוד שגוי ופעולות בהתאמה
      }, 500)

    }
  }






})(jQuery); // End of use strict


// // $('#delete-post').on('click', async function () {
// //   const response = await deleteAll()
// //   location.reload()
// // })

// // async function deleteAll() {
// //   const response = await fetch('http://localhost:3000/admin/add-posts', {
// //     method: 'delete'
// //   });
// // }
// // async function addAll() {//הוספת בתים פרטים מהדטה בייס
// //   const response = await fetch('http://localhost:3000/admin/add-posts', {
// //     method: 'put'
// //   })
// //   return response.json()
// // }




// // $('#add-post').on('click', async function () {
// //   const response = await addAll()
// //   location.reload()
// // })

// // $('.delete-me').on('click', async function () {

// //   await deleteOne($(this).attr('id'))

// //   location.reload()
// // })

// // async function deleteOne(id) {
// //   const response = await fetch(`http://localhost:3000/admin/${id}`, {
// //     method: 'delete'
// //   });
// //   console.log(`http://localhost:3000/admin/${id}`)
// // }

// // $('#add-post-new').submit(async function (e) {
// //   e.preventDefault();
// //   const title = $("input[name = 'title']").val();
// //   const content = $("textarea[name = 'content']").val()
// //   const data = {
// //     title,
// //     content
// //   }

// //   const searchParams = Object.keys(data).map((key) => {
// //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
// //   }).join('&');

// const response = await fetch('http://localhost:3000/admin/add-new-post', {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     method: 'put',
//     body: searchParams
//   }



// //   )
// //   console.log(response.json())
// //   location.reload();
// //   return response.json();

// // })