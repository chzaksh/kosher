const express = require('express')
const router = express.Router()

const {
    MongoClient,
    ObjectID
} = require('mongodb')
const debug = require('debug')('app:admin')
const posts = [{
        title: 'post1',
        text: 'dsfdsf'
    },
    {
        title: 'post2',
        text: 'dsdsfdsfdsf'
    },
    {
        title: 'post3',
        text: 'dsddfdg21321sfdsfdsf'
    },

]

function routerFunction(nav, db) {

    router.route('/add-posts')
        .put((req, res) => {
            (async () => {
                let client;
                try {
                    client = await MongoClient.connect(db.url)
                    // debug('connected to DB server')
                    const data = client.db(db.name)
                    const response = await data.collection('posts').insertMany(posts)
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
                    const response = await data.collection('posts').deleteMany()
                    // debug(response)
                    res.json(response)
                } catch (err) {
                    debug('error: ', err)
                }

            })()
        });



    router.route('/:id')
        .get((req, res) => {
            const id = parseInt(req.params.id) - 1
            res.render('pages/post', {
                title: posts[id].title,
                content: posts[id].text,
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
                    const response = await data.collection('posts').deleteOne({
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
                    const response = await data.collection('posts').insertOne({
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