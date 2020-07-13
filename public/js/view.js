const title = $('title').text('Kosher World');

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



export {
    getZmanimPlc,
    removeSVG,
    myAlert
}