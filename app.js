const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require('qrcode');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8000; 
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
});

//const socketIO = require('socket.io');
//const http = require('http');
//const server = http.createServer(app);
//const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
      ],
    },
    authStrategy: new LocalAuth()
  });

// client.on('authenticated', () => {
//     console.log('AUTHENTICATED');
// });

// client.on('qr', (qr) => {
//     console.log('QR RECEIVED', qr);
//     qrcode.generate(qr);
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('message', msg => {
//     if (msg.body == '!ping') {
//         msg.reply('pong');
//     }
// });

client.initialize();

// app.get('/', (req,res) => {
//     res.sendFile('index.html', { root: __dirname });
// });

app.post('/send-message', (req, res) => {
    const number = req.body.number;
    const message = req.body.message;
    client.sendMessage(number, message).then(response => {
        res.status(200).json({
            status : true,
            response :  response
        });
    }).catch(err => {
        res.status(500).json({
            status : false,
            response : err
        });
    });
});

io.on('connection', function(socket){

    client.on('qr', (qr) => {
        qrcode.toDataURL(qr, (err, url) => {
        socket.emit('qr', url);
        socket.emit('message', 'QR Code received, scan please!');
        console.log('SCAN QR CODE');
        });
    });

    client.on('ready', () => {
        socket.emit('message', 'Whatsapp is ready!');
        console.log('READY');
    });

    client.on('authenticated', () => {
        socket.emit('message', 'Whatsapp is authenticated!');
        console.log('AUTHENTICATED');
    });
    
    client.on('disconnected', (reason) => {
        socket.emit('message', 'Whatsapp is disconnected!');
        client.destroy();
        client.initialize();
    });
});

httpServer.listen(port, function() {
    console.log('App running on *: ' + port);
});