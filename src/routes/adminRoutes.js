const express = require('express')
const router = express.Router()
const Contact = require('../schemas/ContactSchema')
const Hotel = require('../schemas/HotelsSchema')
const House = require('../schemas/HouseSchema')
const Add = require('../schemas/AddSchema')

const {
    MongoClient,
    ObjectID
} = require('mongodb')
const debug = require('debug')('app:admin')
const privateHouse = [{
        title: 'סמיניאק',
        text: `Strategically located just a 5-minute walk from Seminyak's main shopping area, Villa Eight presents elegant and cosy villas featuring private swimming pool surrounded by lush tropical garden.`,
        img: `https://q-cf.bstatic.com/xdata/images/city/square250/691245.webp?k=a516d2cdfe8dc9be3e0e823b2041c4fb515c832630882a66ccd27b4bc86d5e78&amp;o=
        "`,
        star: '3',
        rating: "6",
        guest: "2",
        price: "250$",
        country: "il",
        hotel: "kosher-house",
        lights: "true",
        air: "true",
        door: "false",
    },
    {
        title: 'סמיניאק',
        text: `Strategically located just a 5-minute walk from Seminyak's main shopping area, Villa Eight presents elegant and cosy villas featuring private swimming pool surrounded by lush tropical garden.`,
        img: `https://r-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg `,
        star: "5",
        guest: "3",
        rating: "8",
        price: "150$",
        country: "il",
        hotel: "kosher-house",
        lights: "false",
        air: "true",
        door: "true",
    },
    {
        title: 'סמיניאק',
        text: `Strategically located just a 5-minute walk from Seminyak's main shopping area, Villa Eight presents elegant and cosy villas featuring private swimming pool surrounded by lush tropical garden.`,
        img: `https://r-cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o= `,
        star: "2",
        rating: "9",
        guest: "5",
        price: "100$",
        country: "il",
        hotel: "kosher-house",
        lights: "true",
        air: "false",
        door: "false",
    },

]
const hotels = [{
        title: "Kimberley Gardens Hotel",
        text: `מלון דירות ווילות`,
        img: [{
            link: "https://r-cf.bstatic.com/images/hotel/max1280x900/215/215260682.jpg",
            title: "הבניין של המלון"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max1280x900/215/215260661.jpg",
            title: "בריכת השחייה שנמצאת ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas או באזור"
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/max400/215/215260676.jpg",
            title: "בריכת השחייה שנמצאת ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas או באזור"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max200/215/215260683.jpg",
            title: "הלובי או אזור הקבלה ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/square40/215/215258329.jpg",
            title: "מיטה או מיטות בחדר ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/square40/215/215260382.jpg",
            title: "מיטה או מיטות בחדר ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max400/112/112350972.jpg",
            title: "מיטה או מיטות בחדר ב-Kimberley Gardens Hotel, Serviced Apartments and Serviced Villas"
        }],
        address: "441 Inkerman Street,, 3183 Melbourne, Australia",
        star: '4',
        rating: "8.5",
        guest: "8",
        country: "au",
        city: "melbourne",
        chabad: "true",
        lights: "",
        freezer: "true",
        foodKosher: "true",
        airuve: "",
        air: "",
        door: "false",
        link: `https://www.booking.com/hotel/au/quest-east-st-kilda.he.html?aid=2038680&no_rooms=1&group_adults=2`
    },
    {
        title: "Palace",
        text: `מלון`,
        img: [{
            link: "https://q-cf.bstatic.com/images/hotel/square40/177/177567366.jpg",
            title: "הבניין של המלון"
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/max1280x900/177/177566805.jpg",
            title: "הלובי או אזור הקבלה ב-Palace "
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/max400/177/177581501.jpg",
            title: "מיטה או מיטות בחדר ב-Palace "
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/square40/231/231835754.jpg",
            title: "מיטה או מיטות בחדר ב-Palace "
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/max400/177/177568897.jpg",
            title: "מיטה או מיטות בחדר ב-Palace "
        }],
        address: "вул.Східна 21, Umanʼ, 20300, Ukraine",
        star: '',
        rating: "8.5",
        guest: "6",
        country: "ua",
        city: "uman",
        chabad: "true",
        lights: "true",
        freezer: "",
        foodKosher: "",
        airuve: "",
        air: "true",
        door: "true",
        link: `https://www.booking.com/hotel/ua/palace-uman.he.html?aid=2038680&no_rooms=1&group_adults=2`
    },
    {
        title: " Hotel One",
        text: `מלון`,
        img: [{
            link: "https://q-cf.bstatic.com/images/hotel/max400/827/82715657.jpg",
            title: "הבניין של המלון"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max400/827/82750630.jpg",
            title: "הלובי או אזור הקבלה ב-Hotel One"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/square40/256/256767282.jpg",
            title: "מיטה או מיטות בחדר ב-Hotel One"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/square40/247/247213726.jpg",
            title: "מיטה או מיטות בחדר ב-Hotel One"
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/square40/255/255343180.jpg",
            title: "מיטה או מיטות בחדר ב-Hotel One"
        }],
        address: "Tolstogo Lane, 7, Umanʼ, 20300, Ukraine",
        star: '',
        rating: "8.7",
        guest: "4",
        country: "ua",
        city: "uman",
        chabad: "true",
        lights: "true",
        freezer: "",
        foodKosher: "true",
        airuve: "",
        air: "true",
        door: "true",
        link: `https://www.booking.com/hotel/ua/one.he.html?aid=2038680&no_rooms=1&group_adults=2`
    },
    {
        title: "Ahuzat Ohalei Shalom",
        text: `מלון`,
        img: [{
            link: "https://r-cf.bstatic.com/images/hotel/max400/973/97362649.jpg",
            title: "הבניין של המלון"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max400/208/208016655.jpg",
            title: "הלובי או אזור הקבלה ב-Ahuzat Ohalei Shalom"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max400/224/224648896.jpg",
            title: "מיטה או מיטות בחדר ב-Ahuzat Ohalei Shalom"
        }, {
            link: "https://r-cf.bstatic.com/images/hotel/max400/224/224423274.jpg",
            title: "מיטה או מיטות בחדר ב-Ahuzat Ohalei Shalom"
        }, {
            link: "https://q-cf.bstatic.com/images/hotel/max400/218/218692360.jpg",
            title: "מיטה או מיטות בחדר ב-Ahuzat Ohalei Shalom"
        }],
        address: "T Vladimira Monomaha 16 Street, Umanʼ, 20300, Ukraine",
        star: '',
        rating: "8.3",
        guest: "2",
        country: "ua",
        city: "uman",
        chabad: "true",
        lights: "true",
        freezer: "",
        foodKosher: "true",
        airuve: "",
        air: "true",
        door: "true",
        link: `https://www.booking.com/hotel/ua/ahuzat-ohalei-shalom.he.html?aid=2038680&no_rooms=1&group_adults=2`
    }
]

const adds = [{
        "title": "סאם בייגל",
        "text": "dsdsfrtrrthdsfdsf",
        "img": "https://images.rest.co.il/Customers/80308540/683f04f507c2401aa36201d01a6c7ab3.jpg",
        "link": "samburger.rest.co.il"
    },
    {
        "title": "מסעדת אנטריקוט",
        "text": "dsdsfrtrrthdsfdsf",
        "img": "https://entrecote.rol.co.il/wp-content/uploads/elementor/thumbs/IMG_7534-o2n5cc12j9ld3weo3qgtkfivimn8k12oeizu4ap9xk.jpg",
        "link": "entrecote.rol.co.il/"
    },
    {
        "title": "האגיס",
        "text": "dsdsfdsfdsf",
        "img": "https://s1.kikar.co.il/th/data/auto/nadm/by/yrgndjzk__w160h95q70.jpg",
        "link": "huggies.kimberly-clark.co.il/"
    },
    {
        "title": "וול דאן",
        "text": "dsdsfrtrrthdsfdsf",
        "img": "https://cdn-cms.f-static.net/uploads/1236014/800_5c77b5da95b07.jpeg",
        "link": "www.weldone.co.il/"
    }

]

function routerFunction(nav, db) {
    router.route('/add-hotls')
        .put((req, res) => {
            (async () => {
                let client;
                try {

                    client = await MongoClient.connect(db.url)
                    // debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('tableHotels').insertMany(hotels)
                    debug(response)
                    res.json(response)

                } catch (err) {
                    debug('error: ', err)
                }

            })()

        })
    router.route('/add-adds')
        .put((req, res) => {
            (async () => {
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    // debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('adds').insertMany(adds)
                    debug(response)
                    res.json(response)

                } catch (err) {
                    debug('error: ', err)
                }

            })()

        })
    router.route('/getTable')
        .post((req, res) => {
            (async () => {
                try {
                 const tableContact = await Contact.collection.find({}).toArray()
                 debug(tableContact)
                 res.json(tableContact)
                } catch {

                }
            })()
        })


    router.route('/add-private-house')
        .put((req, res) => {
            (async () => {
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    // debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('tableHousePrivate').insertMany(privateHouse)
                    // debug(response)
                    res.json(response)

                } catch (err) {
                    debug('error: ', err)
                }

            })()

        })
        .delete((req, res) => {
            (async () => {
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    // debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('privateHouse').deleteMany()
                    // debug(response)
                    res.json(response)
                } catch (err) {
                    debug('error: ', err)
                }

            })()
        });
    router.route('/new-Hotels')
        .put((req, res) => {
            debug(45555)
            const data = {
                hotel,
                lights,
                airConditioner,
                door,
                chabad,
                foodKosher,
                freezer,
                airuve,
                email,
                phoneContent,
                textarea,
                state,
                city,
                guest,
                phone,
                url,
                address,
                plece
            } = req.body;
            (async () => {
                debug(data)
                try {


                    const results = await Hotel.collection.insertOne(data)
                    // if (results) {
                    //     res.json(data)
                    // }

                } catch (err) {
                    debug(err);
                }

            })();
        });

    router.route('/new-House')
        .put((req, res) => {
            debug(45555)
            const data = {
                firstName,
                lastName,
                hotel,
                lights,
                airConditioner,
                door,
                chabad,
                foodKosher,
                freezer,
                airuve,
                email,
                phoneContent,
                textarea,
                state,
                city,
                guest,
                phone,
                url,
                address,
                plece,
                manuy,
                plece
            } = req.body;
            (async () => {
                debug(data)
                try {


                    const results = await House.collection.insertOne(data)
                    // if (results) {
                    //     res.json(data)
                    // }

                } catch (err) {
                    debug(err);
                }

            })();
        });
    router.route('/new-Add')
        .put((req, res) => {
            debug(45555)
            const data = {
                firstName,
                lastName,
                email,
                phone,
                url,
                manuy,
            } = req.body;
            (async () => {
                debug(data)
                try {
                    const results = await Add.collection.insertOne(data)
                    // if (results) {
                    //     res.json(data)
                    // }

                } catch (err) {
                    debug(err);
                }

            })();
        });


    router.route('/contact-us')
        .put((req, res) => {

            const data = {
                firstName,
                lastName,
                email,
                phone,
                textarea
            } = req.body;
            (async () => {
                debug('contact')

                try {
                    // const emailUser = {
                    //     email
                    // }

                    const results = await Contact.collection.insertOne(data)
                    if (results) {
                        res.json(results)
                    }

                } catch (err) {
                    debug(err);
                }

            })();
        });

    router.route('/:id')
        .get((req, res) => {
            const id = parseInt(req.params.id) - 1
            res.render('pages/post', {
                title: privateHouse[id].title,
                content: privateHouse[id].text,
                nav
            });
        })
        .delete((req, res) => {
            (async () => {
                const {
                    id
                } = req.params;
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('privateHouse').deleteOne({
                        _id: new ObjectID(id)
                    });
                    // debug(response)
                    res.json(response)
                } catch (err) {
                    debug('error: ', err)
                }
            })()
        });

    router.route('/add-new-post')
        .put((req, res) => {
            (async () => {
                debug(req.body)
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    debug('connected to DB server')

                    // debug(req)
                    const data = client.db(db.name)
                    const response = await data.collection('privateHouse').insertOne({
                        title: req.body.title,
                        text: req.body.content
                    });
                    debug(req.body)
                    res.json(response)
                } catch (err) {
                    debug('error: ', err)
                }
            })()
        });



    return router
}

module.exports = routerFunction