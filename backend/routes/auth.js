const express = require('express')
const JWT = require('jsonwebtoken')
const UserAPI = require('../api/user')

const router = express.Router()

router.get('/me', (req, res) => {
    if(!req.session) return res.status(401).send({msg: 'login first'});
    if(!req.session.user) return res.status(401).send({msg: 'login first'});
    const data = {
        id: req.session.user.id,
        name: req.session.user.name,
        username: req.session.user.username
    }
    res.status(200).send(data)
})

router.post('/login', (req, res) => {
    UserAPI.login(req.body.username, req.body.password).then(data => {
        req.session.user = data
        const token = JWT.sign(data, 'KKuTuKorea', {expiresIn: '1d'})
        res.status(200).send({token: token})
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => err?res.status(200).send({msg: 'success'}):res.status(200).send({msg: 'success'}))
})

router.post('/signup', (req, res) => {
    UserAPI.signup(req.body).then(data => {
        req.session.user = data
        const token = JWT.sign(data, 'KKuTuKorea', {expiresIn: '1d'})
        res.status(200).send({token: token})
    }).catch(err => {
        res.status(400).send({msg: err})
    })
    
})

router.get('/check/username', (req, res) => {
    UserAPI.checkAvailability('username', req.query.val).then(data => {
        res.status(200).send({msg: 'success'})
    }).catch(err => {
        res.status(400).send({msg: err})
    })
})

router.post('/check/email', (req, res) => {
    UserAPI.checkAvailability('email', req.query.val).then(data => {
        res.status(200).send({msg: 'success'})
    }).catch(err => {
        res.status(400).send({msg: err})
    })
})

router.post('/check/phone', (req, res) => {
    UserAPI.checkAvailability('phone', req.query.val).then(data => {
        res.status(200).send({msg: 'success'})
    }).catch(err => {
        res.status(400).send({msg: err})
    })
})
module.exports = router
