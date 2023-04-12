'use strict';

const transport = {};

let callId = 1;

transport.http = (url) => (structure) => {
    const api = {};
    const services = Object.keys(structure);
    for (const name of services) {
        api[name] = {};
        const service = structure[name];
        const methods = Object.keys(service);
        for (const method of methods) {
            api[name][method] = (...args) =>
                new Promise((resolve, reject) => {
                    fetch(`${url}/api/${name}/${method}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ args }),
                    }).then((res) => {
                        if (res.status === 200) resolve(res.json());
                        else reject(new Error(`Status Code: ${res.status}`));
                    });
                });
        }
    }
    return Promise.resolve(api);
};

transport.ws = (url) => (strucure) => {
    const socket = new WebSocket(url);
    const api = {};
    const services = Object.keys(strucure);
    for (const name of services) {
        api[name] = {};
        const service = strucure[name];
        const methods = Object.keys(service);
        for (const method of methods) {
            api[name][method] = (...args) =>
                new Promise((resolve) => {
                    const target = name + '/' + method;
                    const packet = { call: callId, [target]: args };
                    socket.send(JSON.stringify(packet));
                    socket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        resolve(data);
                    };
                });
        }
    }
    return new Promise((resolve) => {
        socket.addEventListener('open', () => resolve(api));
    });
};

const scaffold = (url) => {
    const protocol = url.startsWith('ws:') ? 'ws' : 'http';
    return transport[protocol](url);
};

(async () => {
    const api = await scaffold('ws://localhost:8001')({
        auth: {
            signin: ['login', 'password'],
            signout: [],
            restore: ['token'],
        },
        messeger: {
            method: ['arg'],
        },
    });
    const data = await api.auth.signin('marcus', 'marcus');
    console.dir({ data });
})();
