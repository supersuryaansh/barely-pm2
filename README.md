# Barely-PM2

This module provides a simple interface to manage processes using PM2 (Process Manager 2) in Node.js or Bare applications. It allows you to create, start, stop, list, and delete processes with ease.

## Installation 

```bash
npm i barely-pm2
```

## Usage

You can require this module in your Node.js / Bare application and use the provided functions to manage your PM2 processes.

```js
const { PM2list, PM2delete, PM2stop, PM2start, PM2create } = require('./path-to-your-module');
```

## API

### PM2list(opts = {})
Lists all PM2 processes.

- opts.color: (boolean) Optional. If set to true, forces color output in the console.

### PM2delete(processName)
Deletes a specified PM2 process.

- processName: (string) The name of the process to delete.

### PM2stop(processName)
Stops a specified PM2 process.

- processName: (string) The name of the process to stop.

### PM2start(processName)
Starts a specified PM2 process.

- processName: (string) The name of the process to start.

### PM2create(opts = {})
Creates and starts a new PM2 process.

- opts.name: (string) Optional. Custom name for the process. If not provided, a unique timestamped name will be used.
- opts.script: (string) The script to run.
- opts.args: (string) Arguments to pass to the script.
- opts.timeout: (number) Optional. Timeout in milliseconds after which PM2 will disconnect.

## Example

Here’s an example of how to use the module:

```js
const { PM2list, PM2delete, PM2stop, PM2start, PM2create } = require('./');

PM2create({ name: 'New script', script: '/path/to/script', args: "--host localhost", timeout: 5000 });

PM2list({ color: false });

PM2stop('New script');

PM2start('New script');

PM2delete('New script');
```

## License

This module is licensed under the GPL-3.0 License. See the LICENSE file for more information.
