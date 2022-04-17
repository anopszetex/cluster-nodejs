import { createServer } from 'http'
import { appendFile } from 'fs/promises'
import { fileManager, serverConfig } from './config.js'

const SIZE = { length: 1e3 }

//* 0 -> 40
function randomNumber (max = 40) {
  return Math.floor(Math.random() * max)
}

function applyTotal () {
  const list = Array.from(SIZE, () => randomNumber())

  const total = list.reduce((acc, element) => acc + element, 0)

  return total
}

async function handler (request, response) {
  await appendFile(fileManager.root, `Processed by ${process.pid} \n`)

  const result = applyTotal()

  response.end(result.toString())
}

function startServer () {
  const server = createServer(handler)

  server.listen(serverConfig.port)
}

export { startServer }
