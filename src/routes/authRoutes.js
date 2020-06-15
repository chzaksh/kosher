const express = require('express');
const {
    MongoClient
} = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');
const User = require('../schemas/UserSchema')

const authRouter = express.Router();

function router(db) {
    

    authRouter.route('/sign-up') //פתיחת רוט חדש

        .post((req, res) => { //מטוד פוסט
            const { //תפיסת אינפוט מהבודי
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
                    const results = await User.collection.insertOne(user)
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile')
                    })
                } catch (err) {
                    debug(err);
                }
                // client.close()
            })();
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