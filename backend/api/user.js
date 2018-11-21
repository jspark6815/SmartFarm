const API = require('.')
const SHA256 = require("crypto-js/sha256")

class UserAPI {
	async signup(data) {
		function cL(val, min, max) {
			return min <= val.length && val.length <= max
		}
		return new Promise(async (resolve, reject) => {
			if (!data.username ||
				!data.password ||
				!data.name ||
				!data.zipcode ||
				!data.address1 ||
				!data.address2 ||
				!data.email ||
				!data.phone) return reject('All entries are required.')
			if (!cL(data.username, 3, 16) ||
				!cL(data.password, 8, 30) ||
				!cL(data.name, 2, 5) ||
				!cL(data.zipcode, 5, 5) ||
				!cL(data.address1, 5, 50) ||
				!cL(data.address2, 0, 50) ||
				!cL(data.email, 8, 30) ||
				!cL(data.phone, 11, 11)) return reject('The number of characters is incorrect.')
			if (!/^[a-zA-Z0-9_]+$/g.test(data.username)) return reject('Username is incorrect')
			if (!/^[a-zA-Z0-9~!@\#$%<>^&*()\-=+_\’]+$/g.test(data.password)) return reject('Password is incorrect')
			data.password = SHA256(data.password).toString()
			API.User.create(data).then(data => {
				resolve(data.toJSON())
			}).catch(err => {
				reject(err)
			})
		})
	}
	async login (username, password) {
		return new Promise (async (resolve, reject) => {
			const data = await API.User.findOne({where:{username: username, password: SHA256(password).toString() }})
			if(data) resolve(data.toJSON())
			else reject('Cannot find account.')
		})
	}
	async checkAvailability (column, value) {
		const query = {}
		query[column] = value
		return new Promise(async (resolve, reject) => {
			const data = await API.User.findOne({where:query})
			if(data) reject('Already exist.')
			else resolve()
		})
	}
	async GetCartList(user) {
		const data = await API.Cart.findAll({attributes: ['id', 'product_id'], where: {user_id: user.id}})
		return new Promise(async (resolve, reject) => {
            if(data.length === 0) reject('Empty')
            else {
                resolve(data)
            }
        })
	}
	async AddToCart(user, product_id) {
		const data_ = {
			user_id: user.id,
			product_id: product_id
		}
		return await API.Cart.create(data_)
	}
	async DeleteFromCart(user, product_id) {
		const res =  await API.Cart.destroy({returning: true, where: {id: product_id, user_id: user.id}})
        return new Promise(async (resolve, reject) => {
			if(res > 0) resolve()
			else reject('Cannot find.')
		})
	}
}
	
module.exports = new UserAPI()
	