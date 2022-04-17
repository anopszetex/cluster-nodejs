import { createServer } from 'http'
import { appendFile } from 'fs/promises'
import { fileManager, serverConfig } from './config.js'

const SIZE = { length: 1e3 }
const TIMEOUT = 1e3
const INTERNAL_ERROR = 1

//* 0 -> 40
function randomNumber (max = 40) {
  return Math.floor(Math.random() * max)
}

function applySum (list) {
  return list.reduce((prev, next) => prev + next, 0)
}

async function handler (_, response) {
  await appendFile(fileManager.root, `Processed by ${process.pid} \n`)

  const list = Array.from(SIZE, () => randomNumber())

  const result = applySum(list)

  response.end(result.toString())
}

function startServer () {
  const server = createServer(handler)

  server.listen(serverConfig.port)

  setTimeout(function mySetTimeOut () {
    process.exit(INTERNAL_ERROR)
  }, TIMEOUT)
}

export { startServer }
