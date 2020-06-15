const express = require('express')
const router = express.Router()
const {
    MongoClient,
    ObjectID
} = require('mongodb')
const debug = require('debug')('app:posts')
// const posts = [{
//         title: 'post1',
//         text: 'dsfdsf'
//     },
//     {
//         title: 'post2',
//         text: 'dsdsfdsfdsf'
//     },
//     {
//         title: 'post3',
//         text: 'dsddfdg21321sfdsfdsf'
//     },

// ]


function routerFunction(nav, db, menuSign) {
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
                try {
                    client = await MongoClient.connect(db.url)
                    debug('connected to DB server')
                    const data = client.db(db.name)
                    // debug ('db created')
                    const posts = await data.collection('posts').find().toArray();
                    res.render('pages/posts', {
                        title: 'blog',
                        content: posts,
                        nav,
                        menuSign
                    });

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
                    const post = await data.collection('posts').findOne({
                        _id: new ObjectID(id)
                    });
                    debug(post);
                    res.render('pages/post', {
                        title: 'blog',
                        content: post,
                        nav,
                        id,
                        menuSign

                    });
                } catch (err) {
                    debug('error: ', err)
                }
            })()

        });
    return router
}

module.exports = routerFunction