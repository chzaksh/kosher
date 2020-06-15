const express = require('express')
const router = express.Router()
const debug = require('debug')('app:home')


function routerFunction(nav, menuSign) {
debug(menuSign)
debug(nav)


router.get('/', (req, res) => {
    // debug (req)
    // debug(res)
    res.render('pages/home', {
      title: 'chanoch',
      content: ['html', 'css', 'js', 'php', 'angular', 'node js'],
      nav,
      menuSign
    })
  })


  return router
}

module.exports = routerFunction