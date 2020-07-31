import * as viewus from "./modules/viewus.js";
const title = $('title').text('Kosher World');
let inp = document.getElementsByClassName("container")[0];
$(document).ready(function () {
  $('.selectpicker').css("marginLeft", "100px");
});





function removeSVG() {
    $('svg').remove();
      $('#inputState option img').each(function (i) {
    $(this).attr('src', `https://www.countryflags.io/${$(this).parent().val()}/flat/64.png`)
  })
}

function getZmanimPlc(){
    $('#plcChul ').on('change', () => {
      const plcChul = $('#plcChul').find(":selected").val();
      $('#zmanimIFRAME').attr('src', `https://www.yeshiva.org.il/calendar/YeshivaTimes.aspx?bgcolor=EFEFEF&place=${plcChul}`)
    })
    $('#plc').on('change', () => {
      const plc = $('#plc').find(":selected").val();
      $('#zmanimIFRAME').attr('src', `https://www.yeshiva.org.il/calendar/YeshivaTimes.aspx?bgcolor=EFEFEF&place=${plc}`)
    })
  
  }

  function myAlert(x) {
    alert(x)
  }
  function welcome(first_name, role_id) {
    inp.className -= ("flax");
    inp.innerHTML = `<section class="container">  <h2>welcome, ${first_name}</h2></section>`;
    if (role_id == 1) {
        inp.innerHTML += `${viewus.admin}`;
    } else if (role_id == 2) {
        inp.innerHTML += `${viewus.manager}`;
        console.log(2)
    } else if (role_id == 3) {
        inp.innerHTML += `${viewus.client}`;
        console.log(viewus.client)
        console.log(inp)
    }
}
function crateTr(numLain, tables) { //ממלא נתונים בטבלה
 
  $('#table_user tbody tr').remove();
  $('#table_user tbody').html('<tr> </tr>')
  
  if (numLain == null) {
      oneUser(tables);
  } else if (tables) {
      tables.forEach(table => {
          if (table.role_id == 1) {
              viewus.usersTable(table, 'adminRemove');
          } else {
              viewus.usersTable(table, 'remove');
          }
      });
  }
}
function createHtml() {
  var master = document.getElementById("master");
 
}

function ineerLogin() {

  inp.innerHTML = viewus.login;

  createHtml();

}


export {
    getZmanimPlc,
    removeSVG,
    myAlert,
    welcome,
    crateTr,
    ineerLogin
}