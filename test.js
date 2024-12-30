const { PM2list, PM2delete, PM2stop, PM2start, PM2create, PM2logs } = require('./')

// PM2create({ name: 'New conn', script: 'holesail', args: ' --live 5000', timeout: '5000' })
//
// PM2list({ color: false })
//
// PM2stop('New conn')
//
// PM2start('New conn')
//
// PM2delete('New conn', true)
//
// PM2list({ color: true })

PM2logs('holesail-1735562765958')