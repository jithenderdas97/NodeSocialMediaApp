const express = require('express')
// third party package pulgin imports
const app = express()
const ejs = require('ejs')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('express-flash')

// custom package imports
const init = require('./config/passport-config')
const { BASE_URI } = require('./utils/constantVariables')
const auth = require('./middleware/auth')
const error = require('./middleware/error')

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
const checkAuthenticated = require('./middleware/checkAuth')

// Admin Routes imports
const webAuthRoute = require('./routes/admin/authRoute')
const profileRoute = require('./routes/admin/profileRoute')
const dashboardRoute = require('./routes/admin/dashboardRoute')
const postsRoute = require('./routes/admin/postRoute')
const categoryRoute = require('./routes/admin/categoryRoute')

// Api Routes imports
const productRoute = require('./routes/api/productRoute')
const userRoute = require('./routes/api/userRoute')
const registerRoute = require('./routes/api/authRoute')

app.use(express.urlencoded({extended:true})) // web form request register
app.use(express.json()) //api form request register
app.use(cors({
    origin: '*'
}));
// method override like put and delete method
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

app.use(flash())

app.use(express.static(path.join(__dirname,'public'))) //access public folder in express js
/* Handle bars view engine setup */
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


// Admin routes routes register
app.use('/auth', webAuthRoute)
app.use('/admin', profileRoute)
app.use('/',  dashboardRoute)
app.use('/posts',  postsRoute)
app.use('/categories', categoryRoute)

// Api routes routes register
app.use(`${BASE_URI}/products`,auth, productRoute)
app.use(`${BASE_URI}/users`, userRoute)
app.use(`${BASE_URI}/auth`, registerRoute)
app.get('*', (req, res) => {
    res.render('page-not-found')
})
app.use(error)
module.exports = app