const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const users = ["emr", "user2", "admin"];

app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.post('/signin', (req, res) => {
    const { username } = req.body;
  
    if (users.includes(username)) {
      let responseMessage = { message: "giriş yapıldı" };
  
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
