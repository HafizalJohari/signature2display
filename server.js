const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http'); // Gunakan HTTP biasa
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/signatures/');
    },
    filename: function (req, file, cb) {
        const name = req.body.name.replace(/[^a-zA-Z0-9]/g, '_');
        cb(null, `${name}.png`);
    }
});

const upload = multer({ storage: storage });

app.post('/save-signature', upload.single('signature'), (req, res) => {
    console.log('Received a request to save a signature');
    console.log('Name:', req.body.name);
    console.log('File:', req.file);

    if (!req.file) {
        console.error('No file received');
        return res.status(500).send('Failed to save signature.');
    }

    const filePath = `/signatures/${req.file.filename}`;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ name: req.body.name, filePath }));
        }
    });

    res.redirect(`/display-signature?name=${encodeURIComponent(req.body.name)}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/display-signature', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'display-signature.html'));
});

app.get('/controls', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'controls.html'));
});

const server = http.createServer(app); // Gunakan pelayan HTTP biasa

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.size && data.color && data.duration && data.effect && data.displayCount && data.repeatCount) {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        size: data.size,
                        color: data.color,
                        duration: data.duration,
                        effect: data.effect,
                        displayCount: data.displayCount,
                        repeatCount: data.repeatCount,
                        backgroundColor: data.backgroundColor,
                        nameFontSize: data.nameFontSize,
                        nameFontColor: data.nameFontColor,
                        nameFont: data.nameFont
                    }));
                }
            });
        } else {
            console.log('Received message:', message);
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
