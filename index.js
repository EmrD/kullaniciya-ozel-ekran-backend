const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const users = ["emr", "user2", "admin"];

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {
  const { username } = req.body; 

  if (users.includes(username)) {
    res.send("giriş yapıldı");
  } else {
    res.status(401).send("giriş yapılamadı");
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
