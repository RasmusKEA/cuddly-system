const express = require('express')
const app = express();
const port = 3000;
app.use(express.static("public"));

const { createPage } = require("./render.js");

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
const membersPage = createPage('home/members/members.html')
const newsPage = createPage('home/settings/other/news/news.html')
const finetypesPage = createPage('home/finetypes/finetypes.html')
const feedbackPage = createPage('home/settings/other/feedback/feedback.html')
const changePwMemberPage = createPage('home/settings/teamsettings/memberpassword/member.html')
const changePwAdminPage = createPage('home/settings/teamsettings/adminpassword/admin.html')
const addFineTypesPage = createPage('home/finetypes/add/add.html')
const addMemberPage = createPage('home/members/add/add.html')
const forgotPasswordPage = createPage('frontpage/forgot-password/forgot-password.html')
const profilePage = createPage('home/profile/profile.html')
const currencyPage = createPage('home/settings/teamsettings/currency/currency.html')

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

app.get('/members', (req, res) =>{
  res.send(membersPage)
})

app.get('/news', (req, res) => {
  res.send(newsPage)
})

app.get('/finetypes', (req, res) => {
  res.send(finetypesPage)
})

app.get('/feedback', (req, res) => {
  res.send(feedbackPage)
})

app.get('/member', (req, res) => {
  res.send(changePwMemberPage)
})

app.get('/admin', (req, res) => {
  res.send(changePwAdminPage)
})

app.get('/finetypes/add', (req, res) => {
  res.send(addFineTypesPage)
})

app.get('/members/add', (req, res) => {
  res.send(addMemberPage)
})

app.get('/forgot-password', (req, res) => {
  res.send(forgotPasswordPage)
})

app.get('/profile', (req, res) => {
  res.send(profilePage)
})

app.get('/currency', (req, res) => {
  res.send(currencyPage)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});
  