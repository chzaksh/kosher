import * as view from "./view.js";
import * as model from "./model.js";



export function init() {
    view.title
   

};

$('#bth_Log_in').on('click', async function () {
  
    await model.signIn()
    // location.reload()
})

$('#bth_registr').on('click', async function () {
   
  
    await model.signUp()
    // location.reload()
})


