const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const users = ["emr", "user2", "admin"];
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Giriş yapma (signin)
app.post('/signin', (req, res) => {
    const { username } = req.body;

    if (users.includes(username)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

        let responseMessage = { message: "giriş yapıldı", token };

        // Dashboard bilgilerini ekle
        if (username === "emr") {
            responseMessage.dashboard = "emr";
        } else if (username === "user2") {
            responseMessage.dashboard = "user2";
        } else if (username === "admin") {
            responseMessage.dashboard = "admin";
        }

        // JSON yanıtı gönder
        res.json(responseMessage);
    } else {
        res.status(401).json({ message: "giriş yapılamadı" });
    }
});

// Dashboard bilgilerini döndürme (korumalı)
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token gerekli' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Geçersiz token' });
        }

        // Kullanıcıya özel dashboard verisi döndür
        res.json({ username: decoded.username, dashboard: decoded.dashboard });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
