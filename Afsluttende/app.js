const express = require('express')
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { createPage } = require("./render.js");
const { urlencoded } = require("express"); 

const loginPage = createPage('frontpage/login/login.html')
const homePage = createPage('home/home.html')
const settingsPage = createPage('home/settings/settings.html')

app.get('/', (req, res) => {
  res.send(loginPage)
})

app.get('/home', (req, res) => {
  res.send(homePage);
})

app.get('/settings', (req, res) =>{
  res.send(settingsPage);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });
  