const express = require('express')
const UserAPI = require('../api/user')

const router = express.Router()
router.get('/cart', (req, res) => {
    UserAPI.GetCartList(req.session.user).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})

router.post('/cart', (req, res) => {
    UserAPI.AddToCart(req.session.user, req.body.id).then(data => {
        res.status(200).send({msg: 'success'})
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})

router.delete('/cart', (req, res) => {
    UserAPI.DeleteFromCart(req.session.user, req.body.id).then(data => {
        res.status(200).send({msg: 'success'})
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})
module.exports = router

