const express = require('express')
// third party package pulgin imports
const app = express()
const hbs = require('hbs')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

// custom package imports
const init = require('./config/passport-config')
const { BASE_URI } = require('./utils/constantVariables')
const auth = require('./middleware/auth')

// express session initialize
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
// passport Initialize
app.use(passport.initialize())
app.use(passport.session())

init(passport)
const isAuthenticated = require('./middleware/isAuthenicate')

// Admin Routes imports
const webAuthRoute = require('./routes/admin/authRoute')
const profileRoute = require('./routes/admin/profileRoute')
const dashboardRoute = require('./routes/admin/dashboardRoute')
const postsRoute = require('./routes/admin/postRoute')

// Api Routes imports
const productRoute = require('./routes/api/productRoute')
const userRoute = require('./routes/api/userRoute')
const registerRoute = require('./routes/api/authRoute')

app.use(express.urlencoded({extended:true})) // web form request register
app.use(express.json()) //api form request register
app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname,'public'))) //access public folder in express js
/* Handle bars view engine setup */
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views/partials')) // seperate file like header, footer and etc...
const helpers = require('./utils/handlebars_helpers/helpers')
helpers(hbs)


// Admin routes routes register
app.use('/auth', webAuthRoute)
app.use('/admin',isAuthenticated, profileRoute)
app.use('/', isAuthenticated, dashboardRoute)
app.use('/posts',isAuthenticated, postsRoute)

// Api routes routes register
app.use(`${BASE_URI}/products`,auth, productRoute)
app.use(`${BASE_URI}/users`, userRoute)
app.use(`${BASE_URI}/auth`, registerRoute)
app.get('*', (req, res) => {
    res.render('page-not-found')
})

module.exports = app