const express = require('express');
const bcrypt = require('bcrypt')
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
// app.use(json)
const menuSign = false
const zmanimMenu = false
const zman = null

function router(db, nav) {
    authRouter.route('/sign-up')
        .post((req, res) => {
            const user = {
                userName,
                id_3,
                email,
                password
            } = req.body;

            (async () => {
                try {
                    const emailUser = {
                        email
                    }
                    const dontEmail = await User.collection.findOne(emailUser)

                    if (!dontEmail) {
                        const hashedPassport = await bcrypt.hash(req.body.password, 10)
                        user.password = hashedPassport
                        user.date = new Date().toString()
                        const results = await User.collection.insertOne(user)
                        res.redirect('/home-page')

                    }

                } catch (err) {
                    debug(err);
                }
                //     // client.close()
            })();
        });

    // authRouter.route('/sign-in')

    //     .post((req, res) => {
    //         const user = {
    //             email,
    //             password
    //         } = req.body;
    //         (async () => {
    //             try {

    //                 const results = await User.collection.findOne(user)

    //                 // const results = await User.collection.insertOne(user)
    //                 // req.login(results.ops[0], () => {
    //                 //     res.redirect('/auth/profile')
    //                 // })
    //                  debug(results)
    //                 if (results.id_3 == 1) {
    //                         res.json({
    //                         id: results.id_3,
    //                         name: results.userName
    //                     })

    //                 } else {
    //                     res.json({
    //                         id: results.id_3,
    //                         email: results.email,
    //                         name: results.userName
    //                     })
    //                 }
    //             } catch (err) {
    //                 debug(err);
    //             }
    //             // client.close()
    //         })();
    //     });





    // authRouter.route('/profile')
    //     .all((req, res, next) => {
    //         if (req.user) {
    //             debug('authorized')
    //             next();
    //         } else {
    //             res.redirect('/');
    //         }
    //     })
    //     .get((req, res) => {
    //         res.json(req.user)
    //     });

    authRouter.route('/sign-in').post(passport.authenticate('local', {
        successRedirect: '/home-page',
        failureRedirect: '/'
    }))
    return authRouter;
}

module.exports = router;