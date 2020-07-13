var error = "error:\n";



(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

  $('select').selectpicker();
  async function addAll() {
    const response = await fetch('http://localhost:3000/admin/add-posts', {
      method: 'put'
    })
    return response.json()
  }
  $('#delete-post').on('click', async function () {
    const response = await deleteAll()
    location.reload()
  })

  async function deleteAll() {
    const response = await fetch('http://localhost:3000/admin/add-posts', {
      method: 'delete'
    });
  }

  $('#add-post').on('click', async function () {
    const response = await addAll()
    location.reload()
  })
  $('svg').remove();
  
  

 
  

  $('.delete-me').on('click', async function () {

    await deleteOne($(this).attr('id'))

    location.reload()
  })
  $('#inputState option img').each(function (i) {
    $(this).attr('src', `https://www.countryflags.io/${$(this).parent().val()}/flat/64.png`)
  })


  async function deleteOne(id) {
    const response = await fetch(`http://localhost:3000/admin/${id}`, {
      method: 'delete'
    });
    console.log(`http://localhost:3000/admin/${id}`)
  }

  $('#plcChul ').on('change', () => {
    const plcChul = $('#plcChul').find(":selected").val();
    $('IFRAME').attr('src', `https://www.yeshiva.org.il/calendar/YeshivaTimes.aspx?bgcolor=EFEFEF&place=${plcChul}`)
  })
  $('#plc').on('change', () => {
    const plc = $('#plc').find(":selected").val();
    $('IFRAME').attr('src', `https://www.yeshiva.org.il/calendar/YeshivaTimes.aspx?bgcolor=EFEFEF&place=${plc}`)
  })




  // const country =  $('option');
  // country.each()


  /* <img src="https://www.countryflags.io//flat/64.png"> */


  $('#add-post-new').submit(async function (e) {
    e.preventDefault();
    const title = $("input[name = 'title']").val();
    const content = $("textarea[name = 'content']").val()
    const data = {
      title,
      content
    }

    const searchParams = Object.keys(data).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');

    const response = await fetch('http://localhost:3000/admin/add-new-post', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'put',
        body: searchParams
      }



    )
    console.log(response.json())
    location.reload();
    return response.json();

  })






  submitLogin()



  function submitLogin() { //שליחת טופס לוגין לבדיקה

    $("#login").on('submit', function (event) {
      event.preventDefault(); //מבטל מחיקה של הטופס
      error1() //מורקן את הודעת השגיאה
      if (checkClier("#login") && inputEmail('#email')) {
        //  cheksInput('#email', "#inputPassword")) { //בדיקה אם הנתונים שהוקשו מתאימים לבקשה שנשלחת
        // user(new FormData(this)); //בדיקה של הטופס
      } else {
        myAlert(error); // הודעת שגיאה
      }
    })

  }

  function checkClier(from) { //בדיקת תאי אינפוט ריקים
    var arrayFrom = $(from).find('input');
    var ans = 0;
    $(arrayFrom).each(function (i) {
      if ($(this).val() == "") {
        $(this).addClass("error")
        ans++
      } else {
        $(this).removeClass("error");
        $(this).addClass("is-valid");
      }
    })
    if (ans == 0) {
      return true
    } else {
      error += "You must fill in all fields\n";
    }
  }


  function error1() { //ריקון שגיאה
    error = "error:\n";
  }

  function myAlert(x) {
    alert(x)
  }

  function inputPassword(input) {
    var inputPassword = $(input);
    var mailformat = /[0-9-()+]{3,20}/;
    if (inputPassword.val().match(mailformat)) {
      inputPassword.removeClass("error");
      $(this).addClass("is-valid");
      return true
    } else if ($(inputPassword).length > 0) {
      $(inputPassword).addClass("error");
      error += "the password can be only numbers.\n"
      return false
    }
  }

  function inputEmail(input) { //בדיקת התאמה למייל
    var email = $(input);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;;
    if (email.val().match(mailformat)) {
      email.removeClass("error");
      $(this).addClass("is-valid");
      return true
    } else {
      error += "Mail should be written correctly.\n";
      email.addClass("error");
      return false
    }
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
  async function login(formData) { //כניסה למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
      arr.push(input[1])
    }
    var settings = {
      "url": "https://123-61691b.appdrag.site/api/client/login",
      "data": {
        "emeil": arr[0],
        "password": arr[1],
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






})(jQuery); // End of use strict