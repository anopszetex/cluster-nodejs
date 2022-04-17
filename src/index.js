import os from 'os'
import cluster from 'cluster'
import { initializeServer } from './server.js'

(() => {
  //* if is not process main/the orchestrated.
  //* it can new build copies
  if (!cluster.isPrimary) {
    initializeServer()
    return
  }

  const cpusNumber = os.cpus().length
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking server for ${cpusNumber} CPU\n`)

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    const success = 0

    if (code !== success && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`)
      cluster.fork()
    }
  })
})()
