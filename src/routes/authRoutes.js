const express = require('express');
const {
    MongoClient
} = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');
const User = require('../schemas/UserSchema')
const {
    json
} = require('body-parser');
const authRouter = express.Router();



function router(db) {


    authRouter.route('/sign-up')

        .post((req, res) => {
            const {
                email,
                password
            } = req.body;
            // const url = db.url;
            // const dbName = db.name;
            (async () => {
                // let client;
                try {
                    // client = await MongoClient.connect(url);
                    // const db = client.db(dbName);
                    // const col = db.collection('users');

                    const user = {
                        email,
                        password
                    }
                    const results = await User.collection.findOne(user)
                    debug(results)
                    // if (results)

                    // const results = await User.collection.insertOne(user)
                    // req.login(results.ops[0], () => {
                    //     res.redirect('/auth/profile')
                    // })
                } catch (err) {
                    debug(err);
                }
                // client.close()
            })();
        });

    // authRouter.use(bodyParser.urlencoded({ extended: false }))
    authRouter.route('/contact-us')
        .put((req, res) => {
            debug(5555555555)
            debug(req.body)
           

            // const {
            //     firstName,
            //     email,
            //     phone
            // } =      req.body;
            // debug(firstName,
            //     email,
            //     phone)
            // (async () => {

            //     try {
            // //         const user = {
            // //             email,
            // //             password
            // //         }
            //         const results = await User.collection.insertOne()
            //         debug(results)

            //     } catch (err) {
            //         debug(err);
            //     }

            //  })();
        });


    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                debug('authorized')
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user)
        });

    authRouter.route('/sign-in').post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }))
    return authRouter;
}

module.exports = router;