require('dotenv').config()
const express= require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')

const indexRouter = require('./routes/index')
const ownerRouter= require('./routes/ownerRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

// mongoose
const connectDB = require('./config/db')
connectDB()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash())
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', indexRouter)
app.use('/owner', ownerRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}`)
})