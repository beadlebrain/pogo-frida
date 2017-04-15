let frida = require('frida');
let fridaLoad = require('frida-load');
let fs = require('fs-promise');
let utils = require('./utils');

async function Main() {
    console.log('Launching...');
    let device = await frida.getUsbDevice(10 * 1000);
    let apps = await device.enumerateApplications();
    console.log('Attach to ' + apps[0].identifier);
    let pid = await device.spawn([apps[0].identifier]);
    let session = await device.attach(pid);
    let source = await fridaLoad(require.resolve('./pogoHooks.js'));
    let script = await session.createScript(source);
    script.events.listen('message', (message, data) => {
        if (message.type === 'error') {
            console.error(message.description);
            console.error(message.fileName + ', line ' + message.lineNumber);
            console.error(message.stack);
        } else if (message.type === 'log') {
            console.log(message.payload);
        } else if (message.type === 'send') {
            let msg = message.payload;
            if (msg.type == 'log') {
                console.log(msg.message);
            } else if (msg.type === 'save') {
                fs.writeFileSync(msg.file, data);
            }
        } else {
            console.log(message);
        }
    });
    await script.load();
    await device.resume(pid);
    console.log('Attached, app launching...');
}

Main()
.then(() => console.log('Ready.'))
.catch(e => console.error(e));