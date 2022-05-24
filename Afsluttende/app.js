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
const registerPage = createPage('frontpage/register/register.html')
const activityPage = createPage('home/activity/activity.html')
const depositPage = createPage('home/deposit/deposit.html')
const assignPage = createPage('home/assign/assign.html')
const paymentPage = createPage('home/settings/services/payment/payment.html')
const monthlyPage = createPage('home/settings/services/monthly/monthly.html')
const withdrawPage = createPage('home/withdraw/withdraw.html')
const newsPage = createPage('home/settings/other/news/news.html')


app.get('/', (req, res) => {
  res.send(loginPage)
})

app.get('/home', (req, res) => {
  res.send(homePage);
})

app.get('/settings', (req, res) =>{
  res.send(settingsPage);
})

app.get('/register', (req, res) => {
  res.send(registerPage);
})

app.get('/activity', (req, res) => {
  res.send(activityPage);
})

app.get('/deposit', (req, res) => {
  res.send(depositPage)
})

app.get('/assign', (req, res) => {
  res.send(assignPage)
})

app.get('/payment', (req, res) =>{
  res.send(paymentPage);
})

app.get('/monthly', (req, res) =>{
  res.send(monthlyPage);
})

app.get('/withdraw', (req, res) => {
  res.send(withdrawPage)
})

app.get('/news', (req, res) => {
  res.send(newsPage)
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });
  