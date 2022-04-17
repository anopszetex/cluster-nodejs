import dotenv from 'dotenv'
dotenv.config()

const serverConfig = Object.freeze({
	port: process.env.PORT || 3000
})

const fileManager = Object.freeze({
	root: process.env.ROOT || 'log.txt'
})

export {
	serverConfig,
	fileManager
}
