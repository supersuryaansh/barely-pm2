# Barely-PM2

This module provides a simple interface to manage processes using PM2 (Process Manager 2) in Node.js applications. It allows you to create, start, stop, list, and delete processes with ease.

## Installation 

```bash
npm i barely-pm2
```

## Usage

You can require this module in your Node.js / Bare application and use the provided functions to manage your PM2 processes.

```js
const { PM2list, PM2delete, PM2stop, PM2start, PM2create } = require('barely-pm2');
```

## API

### PM2list(opts = {})
Lists all PM2 processes.

- opts.color: (boolean) Optional. If set to true, forces color output in the console.
- opts.raw: (boolean) Optional. Don't use PM2 binary if set to false.
- opts.name: (string) Optional. List only the processes string with the name.

### PM2delete(processName, exit)
Deletes a specified PM2 process.

- processName: (string) The name of the process to delete.
- exit: (boolean) Exit the process after completion.

### PM2stop(processName, exit)
Stops a specified PM2 process.

- processName: (string) The name of the process to stop.
- exit: (boolean) Exit the process after completion.

### PM2start(processName, exit)
Starts a specified PM2 process.

- processName: (string) The name of the process to start.
- exit: (boolean) Exit the process after completion.

### PM2create(opts = {})
Creates and starts a new PM2 process.

- opts.name: (string) Optional. Custom name for the process. If not provided, a unique timestamped name will be used.
- opts.script: (string) The script to run.
- opts.args: (string) Arguments to pass to the script.
- opts.timeout: (number) Optional. Timeout in milliseconds after which PM2 will disconnect.

### PM2logs(processName)
Display logs for the process

- processName: (string) The name of the process to view logs for.

## Example

Here’s an example of how to use the module:

```js
const { PM2list, PM2delete, PM2stop, PM2start, PM2create } = require('barely-pm2');

PM2create({ name: 'New script', script: '/path/to/script', args: "--host localhost", timeout: 5000 });

PM2list({ color: false });

PM2stop('New script');

PM2start('New script');

PM2delete('New script');
```

## License

This module is licensed under the GPL-3.0 License. See the LICENSE file for more information.
