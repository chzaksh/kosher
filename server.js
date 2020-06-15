const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const debug = require('debug')('app:server')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000;
const mongoose = require('mongoose');
const chalk = require('chalk')
// import { ComplexZmanimCalendar, getZmanimJson } from "kosher-zmanim";



const menuSign = true;
const db = {
  url: 'mongodb://localhost:27017',
  name: 'freelanceApp'
}

const nav = [{
    name: 'HOME',
    link: '/home-pages'
  },
  {
    name: 'ABOUT',
    link: '/#about'
  },
  {
    name: 'ZMANIM',
    link: '/zmanim'
  },
  {
    name: 'BLOG',
    link: '/posts'
  }
]
app.use(cookieParser())
app.use(session({
  secret: 'nm'
}))
require('./src/config/passport.js')(app)

const authRouter = require('./src/routes/authRoutes')(db);
const adminRouter = require('./src/routes/adminRoutes')(nav, db, menuSign)
const postRouter = require('./src/routes/postRoutes')(nav, db, menuSign)
const homeRouter = require('./src/routes/homeRoutes')(nav, menuSign);
const zmanimRouter= require('./src/routes/zmanimRoutes')(nav, menuSign)


app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))

app.use(express.urlencoded({
  extended: false
}))

app.set('views', './src/views')
app.set('view engine', 'ejs')


// app.get('/', (req, res) => {
//   res.render('pages/home', {
//     title: 'chanoch',
//     content: ['html', 'css', 'js', 'php', 'angular', 'node js'],
//     nav,
//     menuSign
//   })
// })

app.use('/home-pages', homeRouter);
app.use('/posts', postRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/zmanim', zmanimRouter)


app.get('/signup', (req, res) => {
  
  res.render('pages/sign', {
    pageTitle: 'Sign up',
    formName: 'signUpForm',
    formAction: '/auth/sign-up',
    submitValue: 'Sign up',
    nav,
    menuSign: false
  });
});

app.get('/signin', (req, res) => {
  debug(4444444444)
  res.render('pages/sign', {
    pageTitle: 'Sign in',
    formName: 'signInForm',
    formAction: '/auth/sign-in',
    submitValue: 'Sign in',
    nav,
    menuSign: false
  });
});
// app.get('/zmanim', (req, res) => {
//   res.render('pages/zmanim', {
//     zmanimCalendar,
//     nav,
//     menuSign: true
//   });
// });



const start = async () => {
  await mongoose.connect(
    'mongodb://127.0.0.1/freelanceApp', {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  debug('Connected to db server');

  app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`)
  });
}

module.exports = start;