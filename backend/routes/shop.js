const express = require('express')
const ShopAPI = require('../api/shop')

const router = express.Router()

router.get('/products', (req, res) => {
    ShopAPI.getProductList().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})

router.get('/product/:id', (req, res) => {
    ShopAPI.getProduct(req.params.id).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(404).send({msg: err})
    })
})

// router.put('/products', (req, res) => {
//     ShopAPI.AddProduct(req.body).then(data => {
//         res.status(200).send({msg: 'success'})
//     }).catch(err => {
//         res.status(400).send({msg: err})
//     })
// })
module.exports = router
