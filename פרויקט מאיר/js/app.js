import {init} from "./controller.js";

init();
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


  function sercheprivate() {

    $('#sercheprivate').on('submit', async function (e) {
      e.preventDefault();
      await search($(this), 'http://localhost:3000/private-house/search')
    })

  }

  function sercheHome() {
    $('#sercheHome').on('submit', async function (e) {
      e.preventDefault();
      await search($(this), 'http://localhost:3000/home-page/search')
    })
  }

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




  $("#signUpForm, #signInForm, #contact-us, #newHotelseForm, #advertising, #newHouseForm").on('submit', function (e) {
    e.preventDefault(); //מבטל מחיקה של הטופס
    const formID = this.id

    login(new FormData(this));
    submit($(this), formID)
  })

  // $('input').on('change', function(e){

  // })





  async function submit(form, formID) { //שליחת טופס לוגין לבדיקה
    let nameForm = await checkNameForm(form, formID)
    model.error1() //מורקן את הודעת השגיאה

    // if (model.checkClier(form) && model.inputEmail('#email')) {
    //   // console.log(form)
    //   //   //  cheksInput('#email', "#inputPassword")) { //בדיקה אם הנתונים שהוקשו מתאימים לבקשה שנשלחת
    //בדיקה של הטופס
    //   // } else {
    //   //   view.myAlert(model.error); // הודעת שגיאה
    // }


  }

  async function checkNameForm(form, formID) {
    // const b = document.getElementById('contact-us')

    // console.log(b)

    let a = null
    let response = false
    let name = null
    let method = null
    if (formID == 'signUpForm') {
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputPassword('#password')) {
        name = formID
        method = 'post'
      }
    }
    if (formID == 'signInForm') {
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputPassword('#password')) {
        name = formID
        method = 'post'
      }
    }
    if (formID === 'contact-us') { //להוסיף טקסט אקסטרה
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
        name = formID
        method = 'put'
      }
    }
    if (formID == 'newHotelseForm') {
      name = formID
    }
    if (formID == 'advertising') {
      name = formID

    }
    if (formID == 'newHouseForm') {
      name = formID
    }
    // if (name != null) {
    //   console.log(`http://localhost:3000/auth/${name}`)
    //   const response = await fetch(`http://localhost:3000/auth/${name}`, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     method: method,
    //     body: a


    //   });
    // console.log(a)
    // console.log(method)

    // }

    // return response, name
  }

  function login(formData) { //כניסה למערכת
    console.log(formData)
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

// //   const response = await fetch('http://localhost:3000/admin/add-new-post', {
// //       headers: {
// //         'Content-Type': 'application/x-www-form-urlencoded'
// //       },
// //       method: 'put',
// //       body: searchParams
// //     }



// //   )
// //   console.log(response.json())
// //   location.reload();
// //   return response.json();

// // })