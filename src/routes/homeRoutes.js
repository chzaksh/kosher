const express = require('express')
const router = express.Router()
const debug = require('debug')('app:home')
const {
  MongoClient,
  ObjectID
} = require('mongodb')





function routerFunction(nav, db, menuSign, zmanimMenu) {

  router.route('/')
    .get((req, res) => {
      (async () => {
        let client;
        let query = {};
        const user = null;
        if (req.user){
          user = req.user
        }
        debug('home',req.user)
        try {
          client = await MongoClient.connect(db.url)
          debug('connected to DB server')
          const data = client.db(db.name)
          const addsList = await data.collection('adds').find().toArray();
          const hotels = await data.collection('tableHotels').find(query).toArray();
          res.render('pages/home', {
            user,
            title: "Kosher World",
            content: hotels,
            countryName: '',
            countryId: '',
            hotel: '',
            city: '',
            nav,
            addsList,
            menuSign,
            zmanimMenu,
            zmanimMenudoor: false,
            air: false,
            lights: false,
            freezer: false,
            chabad: false,
            foodKosher: false,
            airuve: false,
            door: false,
            star: false,
            rating: false,
          });
        } catch (err) {
          debug('error: ', err)
        }
      })()
    })
  router.route('/search')
    .get((req, res) => {
      const user = null;
      if (req.user){
        user = req.user
      }
      
      debug(user)
        (async () => {
          let countryName
          let countryId
          let hotel
          let city
          let air
          let door
          let lights
          let client;
          let freezer;
          let chabad;
          let foodKosher;
          let airuve;
          let star;
          let rating;
          let query = {};
          if (req.query.countryID) {
            countryName = req.query.countryName
            countryId = req.query.countryID;
            query.countryId = req.query.countryID.toLowerCase()
          }
          if (req.query.city) {
            query.city = req.query.city.toLowerCase();
            city = req.query.city
          }
          if (req.query.hotel) {
            query.hotel = req.query.hotel.toLowerCase();
            hotel = req.query.hotel
            debug(hotel)
          }
          if (req.query.lights) {
            query.lights = req.query.lights;
            lights = `checked`;
          }
          if (req.query.air) {
            query.air = req.query.air;
            air = 'checked';
          }
          if (req.query.freezer) {
            query.freezer = req.query.freezer;
            freezer = 'checked';
          }
          if (req.query.chabad) {
            query.chabad = req.query.chabad;
            chabad = 'checked';
          }
          if (req.query.foodKosher) {
            query.foodKosher = req.query.foodKosher;
            foodKosher = 'checked';
          }
          if (req.query.airuve) {
            query.airuve = req.query.airuve;
            airuve = 'checked';
          }
          if (req.query.door) {
            query.door = req.query.door;
            door = 'checked';
          }
          if (req.query.star) {
            query.star = req.query.star;
            star = req.query.star
            debug(star)
          }
          if (req.query.rating) {
            query.rating = req.query.rating;
            rating = req.query.rating
          }
          try {
            debug(query)
            client = await MongoClient.connect(db.url)
            debug('connected to DB server')
            const data = client.db(db.name)
            const addsList = await data.collection('adds').find().toArray();
            const hotelList = await data.collection('tableHotels').find(query).toArray();

            res.render('pages/home', {
              user,
              title: 'Kosher World',
              content: hotelList,
              countryId,
              countryName,
              hotel,
              city,
              addsList,
              door,
              air,
              lights,
              freezer,
              chabad,
              foodKosher,
              airuve,
              star,
              rating,
              nav,
              menuSign,
              zmanimMenu
            });
            debug(hotelList)
          } catch (err) {
            debug('error: ', err)
          }
        })()

    });
  router.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(db.url)
          const data = client.db(db.name)
          const post = await data.collection('tableHotels').findOne({
            _id: new ObjectID(id)
          });
          debug(post);
          res.render('pages/house', {
            title: 'blog',
            content: post,
            nav,
            id,
            menuSign,
            zmanimMenu

          });
        } catch (err) {
          debug('error: ', err)
        }
      })()

    });


  return router
}

module.exports = routerFunction