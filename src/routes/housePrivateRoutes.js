const express = require('express')
const router = express.Router()
const {
    MongoClient,
    ObjectID
} = require('mongodb')
const debug = require('debug')('app:private-house')



function routerFunction(nav, db, menuSign, zmanimMenu) {
    // router.use((req, res, next) => {
    //     if (req.user) {
    //         next()
    //     } else {
    //         res.redirect('/')
    //     }
    // })

    router.route('/')
        .get((req, res) => {

            (async () => {
                let client;
                let query = {};

                try {
                    client = await MongoClient.connect(db.url)
                    debug('connected to DB server')
                    const data = client.db(db.name)
                    const addsList = await data.collection('adds').find().toArray();
                    const privatehouse = await data.collection('tableHousePrivate').find(query).toArray();
                    debug(privatehouse)
                    // res.json(privatehouse)
                    res.render('pages/housePrivate', {
                        title: 'Private House',
                        content: privatehouse,
                        countryName: '',
                        countryId: '',
                        hotel: '',
                        city: '',
                        addsList,
                        door: false,
                        air: false,
                        lights: false,
                        freezer: false,
                        chabad: false,
                        foodKosher: false,
                        airuve: false,
                        star: false,
                        rating: false,
                        nav,
                        menuSign,
                        zmanimMenu
                    });
                    // debug(privatehouse)
                } catch (err) {
                    debug('error: ', err)
                }
            })()

        });

    router.route('/search')
        .get((req, res) => {

            (async () => {
                let countryName
                let countryId
                let hotel
                let city
                let air
                let door
                let lights
                let client;
                let star;
                let rating;
                let freezer;
                let chabad;
                let foodKosher;
                let airuve;
                let query = {};
                if (req.query.countryID) {
                    query.countryId = req.query.countryID.toLowerCase()
                    countryName = req.query.countryName
                    countryId = req.query.countryID

                }
                if (req.query.city) {
                    query.city = req.query.city.toLowerCase();
                    city = req.query.city
                }
                if (req.query.hotel) {
                    query.hotel = req.query.hotel.toLowerCase();
                    hotel = req.query.hotel
                }
                if (req.query.lights) {
                    query.lights = req.query.lights;
                    debug(req.query.lights)
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
                    const privatehouse = await data.collection('tableHousePrivate').find(query).toArray();
                    debug(privatehouse)
                    // res.json(privatehouse)

                    res.render('pages/housePrivate', {
                        title: 'Private House',
                        content: privatehouse,
                        countryId,
                        countryName,
                        hotel,
                        city,
                        door,
                        air,
                        addsList,
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
                    debug(privatehouse)
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
                    const house = await data.collection('tableHousePrivate').findOne({
                        _id: new ObjectID(id)
                    });
                    debug(house);
                    res.render('pages/house', {
                        title: 'private',
                        content: house,
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