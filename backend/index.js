const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const https = require('https')
const fs = require('fs')
const JWT = require('jsonwebtoken')

const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')
const ShopRoute = require('./routes/shop')

const privateKey  = fs.readFileSync('./ssl/private.key', 'utf8')
const certificate = fs.readFileSync('./ssl/certificate.crt', 'utf8')
const credentials = {key: privateKey, cert: certificate}

const app = express()
const httpsServer = https.createServer(credentials, app)

app.use(session({
    secret: 'plugtower',
    resave: false,
    saveUninitialized: true,
}))

app.use(morgan())
app.use(helmet())
app.use(cors())
// app.use((req, res, next) => {
//     var allowedOrigins = ['http://localhost:3000', 'https://plugtower.dimigo.kr'];
//     var origin = req.headers.origin;
//     if(allowedOrigins.indexOf(origin) > -1) {
//         res.setHeader('Access-Control-Allow-Origin', origin)
//         res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
//     }
//     //res.header('Access-Control-Allow-Origin', allowedOrigins)
//     res.header("Access-Control-Allow-Headers", '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
//     next()
// })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.use((req, res, next) => {
    if (token = req.headers['authorization']) {
        JWT.verify(token, 'KKuTuKorea', function(err, decoded) {
            if(!err) req.session.user = decoded
            next()
        });
    } else {
        next()
    }
})
async function checkLogin (req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).send({msg: 'You should login before request.'})
    }
}
app.use('/auth', AuthRoute)
app.use('/shop', ShopRoute)
app.use('/user', checkLogin, UserRoute)

app.listen(80)
httpsServer.listen(443)