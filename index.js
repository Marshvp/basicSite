const fs = require('node:fs');
const { createServer } = require('node:http');
const url = require('node:url');


const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {

    let pathname = url.parse(req.url).pathname;
    console.log(pathname);
    
    if (pathname === '/' || pathname === '/index') {
        pathname = 'index.html';
    } else if (pathname === '/about') {
        pathname = 'about.html';
    } else if (pathname === '/contact-me') {
        pathname = 'contact-me.html';
    } else {
        pathname = '404.html';
    }


    fs.readFile(pathname, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
            console.log(`Served ${pathname}`);
        }
    })
})

server.listen(port, hostname, () => {
    
    console.log(`Server running at http://${hostname}:${port}/`);
})