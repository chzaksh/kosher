const express = require('express')
const debug = require('debug')('app:zmanim')
const KosherZmanim = require("kosher-zmanim");
const zmanimRoute = express.Router();



function routerFunction(nav, menuSign) {
    const data = new KosherZmanim.ZmanimCalendar();
    const zmanimJSON = KosherZmanim.getZmanimJson(data.date.loc.locale)
    debug(zmanimJSON.metadata.date)
    //  const location = data.date.loc.locale;
    //     const date1 = zmanimJSON.metadata.date;

    const location= data.date.loc.locale;
       const date1 = zmanimJSON.metadata.date;
    const zmanim = [location, date1];
    
    zmanimRoute.get('/', (req, res) => {

       



        res.render('pages/zmanim', {
            menuSign,
            nav,
            zmanim
        })

    })



    return zmanimRoute
}

module.exports = routerFunction;

// / const Alos72 = res.json(zmanimJSON.BasicZmanim.Alos72)
// const sofZmanShmaMGA = res.json(zmanimJSON.BasicZmanim.SofZmanShmaMGA)
// const sofZmanShmaGRA = res.json(zmanimJSON.BasicZmanim.SofZmanShmaGRA)
// const sofZmanTfilaMGA = res.json(zmanimJSON.BasicZmanim.SofZmanTfilaMGA)
// const sofZmanTfilaGRA = res.json(zmanimJSON.BasicZmanim.SofZmanTfilaGRA)
// const chatzos = res.json(zmanimJSON.BasicZmanim.Chatzos)
// const Tzais72 = res.json(zmanimJSON.BasicZmanim.Tzais72)
// const Tzais = res.json(zmanimJSON.BasicZmanim.Tzais)

// app: zmanim BeginNauticalTwilight: '2020-06-14T01:41:40+00:00',
//     app: zmanim BeginCivilTwilight: '2020-06-14T02:55:03+00:00',
//     app: zmanim SeaLevelSunrise: '2020-06-14T03:42:28+00:00',
//     app: zmanim Sunrise: '2020-06-14T03:42:28+00:00',

//     
//     app: zmanim SunTransit: '2020-06-14T12:00:30+00:00',
//     app: zmanim MinchaGedola: '2020-06-14T12:42:00+00:00',
//     app: zmanim MinchaKetana: '2020-06-14T16:51:01+00:00',
//     app: zmanim PlagHamincha: '2020-06-14T18:34:47+00:00',
//     app: zmanim CandleLighting: '2020-06-14T20:00:32+00:00',
//     app: zmanim SeaLevelSunset: '2020-06-14T20:18:32+00:00',
//     app: zmanim Sunset: '2020-06-14T20:18:32+00:00',
//     app: zmanim EndCivilTwilight: '2020-06-14T21:06:01+00:00',
//    
//     app: zmanim EndNauticalTwilight: '2020-06-14T22:19:41+00:00',
//     app: zmanim ShaahZmanisGra: 'PT1H23M0.373S',
//     app: zmanim TemporalHour: 'PT1H23M0.373S',
//     app: zmanim ShaahZmanisMGA: 'PT1H35M0.373S',
//     app: zmanim AlosHashachar: 'N/A',
//     app: zmanim BeginAstronomicalTwilight: 'N/A',
//     app: zmanim EndAstronomicalTwilight: 'N/A'