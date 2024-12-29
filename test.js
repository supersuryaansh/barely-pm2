const { PM2list, PM2delete, PM2stop, PM2start, PM2create } = require('./')

PM2create({ name: 'New conn', script: 'holesail', args: ' --live 5000', timeout: '5000' })

PM2list({ color: false })

PM2stop('New conn')

PM2start('New conn')

PM2delete('New conn')

PM2list({ color: true })
