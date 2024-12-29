const { runtime } = require('which-runtime')
runtime === 'bare' && (process = require('bare-process'))
const pm2 = require('pm2')
const { spawn } = require('child_process')
const path = require('path')
const pm2Binary = path.join(path.dirname(require.resolve('pm2')), 'bin', 'pm2')

function PM2list (opts = {}) {
  // Need to spawn or else PM2 will display full black and white
  const child = spawn(process.execPath, [pm2Binary, 'list'], {
    shell: false,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: opts.color } // Force color output
  })

  child.on('error', (err) => {
    console.error('Error listing connections:', err)
    process.exit(2)
  })

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Process exited with code ${code}`)
      process.exit(code)
    }
  })
}

// Handle deletion of stored connections
function PM2delete (processName) {
  if (!processName) {
    console.error('Please specify a connection name to delete')
    process.exit(1)
  }

  pm2.connect((err) => {
    if (err) {
      console.error('Error connecting to pm2:', err)
      process.exit(2)
    }

    pm2.delete(processName, (err) => {
      pm2.disconnect()
      if (err) {
        console.log(`Failed to delete connection with name: ${processName}`, err.message)
        process.exit(2)
      }
      console.log(`Connection deleted: ${processName}`)
    })
  })
}

function PM2stop (processName) {
  // Handle stopping processes
  if (!processName) {
    console.error('Please specify a connection name to stop')
    process.exit(1)
  }

  pm2.connect((err) => {
    if (err) {
      console.error('Error connecting to pm2:', err)
      process.exit(2)
    }

    pm2.stop(processName, (err) => {
      pm2.disconnect()
      if (err) {
        console.error(`Failed to stop connection with name: ${processName}`, err.message)
        process.exit(2)
      }
      console.log(`Connection stopped: ${processName}`)
    })
  })
}

function PM2start (processName) {
  if (!processName) {
    console.error('Please specify a connection name to start')
    process.exit(1)
  }

  pm2.connect((err) => {
    if (err) {
      console.error('Error connecting to pm2:', err)
      process.exit(2)
    }

    pm2.start(processName, { interpreter: process.execPath }, (err) => {
      pm2.disconnect()
      if (err) {
        console.error(`Failed to start connection with name: ${processName}`, err.message)
        process.exit(2)
      }
      console.log(`Connection started with name: ${processName}`)
    })
  })
}

function PM2create (opts = {}) {
  const name = opts.name || `${Date.now()}` // Custom name or unique timestamped name

  pm2.connect((err) => {
    if (err) {
      console.error('Error connecting to pm2:', err)
      process.exit(2)
    }

    pm2.start({
      name,
      script: opts.script, // Run the holesail script through index.js
      args: opts.args,
      interpreter: process.execPath
    }, (err) => {
      if (err) {
        pm2.disconnect()
        console.error('Failed to start connection:', err)
        process.exit(2)
      }

      console.log(`Session started with name: ${name}`)
      // Now capture the logs
      // We need it to see the connection information
      pm2.launchBus((err, bus) => {
        if (err) {
          console.error('Error launching log bus:', err)
          pm2.disconnect()
          return
        }

        bus.on('log:out', (packet) => {
          if (packet.process.name === name) {
            // Strip the PM2 prefix and display only the actual log message
            const logMessage = packet.data.replace(/^\[.*\]\s*/, '')
            console.log(logMessage)
          }
        })

        bus.on('log:err', (packet) => {
          if (packet.process.name === name) {
            // Strip the PM2 prefix and display only the actual log message
            const logMessage = packet.data.replace(/^\[.*\]\s*/, '')
            console.error(logMessage)
          }
        })

        if (opts.timeout) {
          setTimeout(() => pm2.disconnect(), opts.timeout)
        }
      })
    })
  })
}

module.exports = { PM2list, PM2delete, PM2stop, PM2start, PM2create }
