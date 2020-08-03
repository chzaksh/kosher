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
    const country = {
      id: $(form).find('#state').val(),
      name: $(form).find('#state option:selected').text()
    }
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

  $('#home #clearBTN').on('click', function (e) {
    location.href = '/home-page/'
  })
  $('#housePrivate #clearBTN').on('click', function (e) {
    location.href = '/private-house/'
  })


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
      url.searchParams.append('countryID', country.id)
      url.searchParams.append('countryName', country.name)
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
    const formID = this.id
    //  if (formID == 'signInForm') {
    //   method = 'post'
    //   body = {
    //     "email": $('#email').val(),
    //     "password": $('#password').val(),
    //   }
    //   url = 'auth/sign-in'
    //   ata = model.objectKeys(body)
    // } else {
    //   submit($(this), formID)
    // }


    submit($(this), formID)
  })

  // $('input').on('change', function(e){

  // })





  async function submit(form, formID) { //שליחת טופס לוגין לבדיקה
    const result = await checkNameForm(form, formID)
    model.error1() //מורקן את הודעת השגיאה
    // console.log(result)
    // if (result.id == 1) {
    // const url = new URL('http://localhost:3000/home-page');

    // view.welcome(result.name, result.role_id); //שולח שם משתמש לחלק העליון של העמוד
    //   console.log(4333333333)
    //   admin1(); //פונקציות מנהל
    //   // admin2();
    // } else {
    //   console.log(false)
    // }

  }


  async function checkNameForm(form, formID) {
    let response = false
    let method = 'put'
    let data = null
    let url = null
    let body = null

    if (formID == 'signUpForm' || formID == 'signInForm') {
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputPassword('#password')) {
        if (formID == 'signUpForm') {
          body = {
            "userName": $('#userName').val(),
            "email": $('#email').val(),
            "id_3": 3,
            "password": $('#password').val(),
          }
          url = 'auth/sign-up'
        } else {

          body = {
            "email": $('#email').val(),
            "password": $('#password').val(),
          }
          url = 'auth/sign-in'
        }
        data = model.objectKeys(body)
        method = 'post'
      }
    }
    if (formID === 'contact-us') { //להוסיף טקסט אקסטרה
      if (model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
        body = {
          "firstName": $('#firstName').val(),
          "lastName": $('#lastName').val(),
          "email": $('#email').val(),
          "phone": $('#phone').val(),
          "textarea": $('#textarea').val()
        }
        data = model.objectKeys(body)
        url = 'admin/contact-us'
      }
    }
    if (formID == 'newHotelsForm') {
      if (model.inputEmail('#email') && model.checkClier($('#urlDiv'))) {
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
        body = {
          "firstName": $('#firstName').val(),
          "lastName": $('#lastName').val(),
          "email": $('#email').val(),
          "url": $('#url').val(),
          "phone": $('#phone').val(),
          "manuy": $('input[name=manuy]:checked').val(),
        }
        data = model.objectKeys(body)
        url = 'admin/new-Add'
      }
    }
    if (formID == 'newHouseForm') {
      if (model.checkSelect('#state') && model.checkClier(form) && model.inputEmail('#email') && model.inputTel('#phone')) {
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
      response = await model.putDB(url, method, data)
      console.log(url, method, data)
    }
    return response
  }

  function admin1() { //אחראי על הצד השמאלי בעמוד של המנהל 
    putUsersInTable(); //מקבל נתונים מהדטה בייס ושולח לטבלה בעמוד מנהל
    // clickRefresh(); //נותן קליק לכפתור רענון טבלה בעמוד המנהל
  }

  async function putUsersInTable() { //מקבל נתונים מהדטה בייס ושולח לטבלה בעמוד מנהל
    let users = await model.getOllUsers(); // מקבל את כל המשתמשים 
    console.log(users)
    let usersLen = users.length;
    view.crateTr(usersLen, users); //שולח את המשתמשים לטבלה
    // deletUser(); // יוצר כפתור מחיקה בטבלת המשתמשים וגם מוחק
    // uppdeteUser(); // יוצר כפתור עדכון ומעדכן
    // document.getElementsByClassName("btn_changecode")[0].addEventListener("click", chengeCode); // נותן אפשרות להחליף קוד
    // view.numbers(); //מכניס מספרים ליד השמות
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