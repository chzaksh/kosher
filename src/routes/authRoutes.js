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
// app.use(json)



function router(db) {
    authRouter.route('/sign-up')
        .put((req, res) => {
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
                        const results = await User.collection.insertOne(user)
                        if (results) {
                            res.json({user:user.userName,email:user.email})
                            // req.login(results.ops[0], () => {
                            //     res.redirect('/auth/profile')
                            // })
                        }
                    }

                } catch (err) {
                    debug(err);
                }
                //     // client.close()
            })();
        });

    authRouter.route('/sign-in')

        .post((req, res) => {
            const user ={
                email,
                password
            } = req.body;
            (async () => {
                try {
                    
                    const results = await User.collection.findOne(user)
                    debug(results)
                     if (results){
                         res.json(true)
                     }

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