const Sequelize = require('sequelize')

const API = new Sequelize('main', 'root', 'kdw0410', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false,
	timezone: '+09:00',
	dialectOptions: {
		charset: 'utf8mb4'
	},
	define: {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci'
	}
})

API.User = User = API.define('user', {
	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
	username: { type: Sequelize.STRING(16), allowNull: false },
	password: { type: Sequelize.CHAR(64), allowNull: false },
	name: { type: Sequelize.STRING(5), allowNull: false },
	zipcode: { type: Sequelize.CHAR(5), allowNull: false },
	address1: { type: Sequelize.STRING(100), allowNull: false },
	address2: { type: Sequelize.STRING(100), allowNull: false },
	email: { type: Sequelize.STRING(30), allowNull: false },
	phone: { type: Sequelize.STRING(11), allowNull: false }
})

// API.Album = Album = API.define('album', {
// 	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
// 	user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
// 	name: { type: Sequelize.STRING(20), allowNull: false },
// 	desc: { type: Sequelize.STRING(50), allowNull: false },
// })
// Album.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

API.Product = Product = API.define('product', {
	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
	name: { type: Sequelize.STRING(20), allowNull: false },
	cost: { type: Sequelize.INTEGER.UNSIGNED },
	amount: { type: Sequelize.STRING(20), allowNull: false },
	image: { type: Sequelize.STRING(50), allowNull: false }
})

API.Cart = Cart = API.define('cart', {
	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
	product_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
	user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false }
})
Cart.belongsTo(Product, {foreignKey: 'product_id', targetKey: 'id'})
Cart.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

// API.Slide_Image = Slide_Image = API.define('slide_image', {
// 	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
// 	slide_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
// 	image_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false }
// })
// Slide_Image.belongsTo(Slide, {foreignKey: 'slide_id', targetKey: 'id'})
// Slide_Image.belongsTo(Image, {foreignKey: 'image_id', targetKey: 'id'})

// API.Device = Device = API.define('device', {
// 	id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
// 	name: { type: Sequelize.STRING(20), allowNull: false },
// 	desc: { type: Sequelize.STRING(50), allowNull: false },
// 	user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
// 	serial: { type: Sequelize.CHAR(16), allowNull: false },
// 	selected_image_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
// 	selected_slide_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true }
// })
// Device.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})
// Device.belongsTo(Image, {foreignKey: 'selected_image_id', targetKey: 'id'})
// Device.belongsTo(Slide, {foreignKey: 'selected_slide_id', targetKey: 'id'})

API.sync({alter: true})

module.exports = API
