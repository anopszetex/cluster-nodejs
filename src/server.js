import { startServer } from './server/index.js'
import dotenv from 'dotenv'
dotenv.config()

function initializeServer () {
  try {
    startServer()
    console.log(`🚀 Server running and pid at ${process.pid}`)
  } catch (err) {
    console.error(`❌ Fail to start server: ${err.message}`)
  }
}

export { initializeServer }
