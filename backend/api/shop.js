const API = require('.')

class ShopAPI {
	async getProduct(id) {
		const data = await API.Product.findOne({attributes: ['id', 'name', 'cost', 'amount', 'image'], where: {id: id}})
		return new Promise(async (resolve, reject) => {
            if(!data) reject('Cannot find.')
            else {
                resolve(data.toJSON())
            }
        })
	}
	async getProductList() {
		const data = await API.Product.findAll({attributes: ['id', 'name', 'cost', 'amount', 'image']})
		return new Promise(async (resolve, reject) => {
            if(data.length === 0) reject('Empty')
            else {
                resolve(data)
            }
        })
	}
}
	
module.exports = new ShopAPI()
	