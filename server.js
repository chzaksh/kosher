const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const debug = require('debug')('app:server')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000;
const cors = require('cors')
const mongoose = require('mongoose');
const chalk = require('chalk');
const p = require('body-parser');
const bcrypt = require('bcrypt')



// const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })


// import { ComplexZmanimCalendar, getZmanimJson } from "kosher-zmanim";



const menuSign = true;
const zmanimMenu = true;
const db = {
  url: 'mongodb://localhost:27017',
  name: 'kosherWorld'
}

const nav = [{
    name: 'HOME',
    id: 'home_nav',
    link: '/home-page'
  },
  {
    name: 'ABOUT',
    id: 'about_nav',
    link: '/home-page/#about'
  },
  {
    name: 'ZMANIM',
    id: 'zmanim_nav',
    link: '/zmanim'
  },
  {
    name: 'PRIVATE HOUSE',
    id: 'private_house_nav',
    link: '/private-house'
  }, {
    name: 'CONTACT US',
    id: 'contact_nav',
    link: '/contact-us'
  }
]
app.use(cookieParser())
app.use(session({
  secret: 'nm'
}))
require('./src/config/passport.js')(app)
app.use(cors())
const authRouter = require('./src/routes/authRoutes')(db, nav);
const adminRouter = require('./src/routes/adminRoutes')(nav, db, menuSign, zmanimMenu);
const housePrivateRouter = require('./src/routes/housePrivateRoutes')(nav, db, menuSign, zmanimMenu);
const homeRouter = require('./src/routes/homeRoutes')(nav, db, menuSign, zmanimMenu);
const zmanimRouter = require('./src/routes/zmanimRoutes')(nav, menuSign, zmanimMenu);


app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))

app.use(express.urlencoded({
  extended: false
}))

// app.use(p.json())
// app.use(p.urlencoded({ extended: true }))

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

app.use('/home-page', homeRouter);
app.use('/private-house', housePrivateRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/zmanim', zmanimRouter)
// app.use(p)

app.get('/signup', (req, res) => {
  res.render('pages/sign', {
    formID: 'signUpForm',
    pageTitle: 'Sign up',
    formName: 'signUpForm',
    formAction: '/auth/sign-up',
    submitValue: 'Sign up',
    nav,
    menuSign: false,
    zmanimMenu: false
  });
});

app.get('/signin', (req, res) => {
  debug('sign-in')
  res.render('pages/sign', {
    formID: 'signInForm',
    pageTitle: 'Sign in',
    formName: 'signInForm',
    formAction: '/auth/sign-in',
    submitValue: 'Sign in',
    nav,
    menuSign: false,
    zmanimMenu: false
  });
});

app.get('/newHouse', (req, res) => {
  res.render('pages/sign', {
    formID: 'newHouseForm',
    pageTitle: 'הוספת בית פרטי',
    formName: 'newHouseForm',
    formAction: '/admin/new-House',
    submitValue: 'submit',
    price: [{
      Free: '$0',
      text: 'חודש נסיון מתנה'
    }, {
      'Pro': '$15',
      'text': 'פרסום חצי שנה'
    }, {
      'Enterprise': '$29',
      'text': 'פרסום שנה שלימה'
    }],
    nav,
    menuSign: true,
    zmanimMenu: false

  });
});
app.get('/newLinkHotel', (req, res) => {
  res.render('pages/sign', {
    formID: 'newHotelsForm',
    pageTitle: 'הוספת מלון/בית הארחה ',
    formName: 'newHotelsForm',
    formAction: '/admin/new-Hotels',
    submitValue: 'submit',
    nav,
    menuSign: true,
    zmanimMenu: false

  });
});

app.get('/contact-us', (req, res) => {
  res.render('pages/sign', {
    formID: 'contact-us',
    pageTitle: 'contact-us',
    formName: 'contactUsForm',
    formAction: '/admin/contact-us',
    submitValue: 'submit',
    nav,
    menuSign: true,
    zmanimMenu: false
  });
});
app.get('/newAdvertising', (req, res) => {
  res.render('pages/sign', {
    formID: 'advertising',
    pageTitle: 'advertising',
    formName: 'advertisingForm',
    formAction: '/admin/newAdvertising',
    submitValue: 'submit',
    price: [{
      'Free': '$20',
      'text': 'חודש אחד'
    }, {
      'Pro': '$50',
      'text': ` פרסום 6 חודשים `
    }, {
      'Enterprise': '$90',
      'text': 'פרסום 12 חודשים'
    }],
    nav,
    menuSign: true,
    zmanimMenu: false
  });
});
// app.post('/auth/contact-us', urlencodedParser,  function (req, res) {
//   debug(req.body.firstName)
// })

const start = async () => {
  await mongoose.connect(
    'mongodb://127.0.0.1/kosherWorld', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  debug('Connected to db server');

  app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`)
  });
}

module.exports = start;