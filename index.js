const express = require('express')
const app = express()
const port = 3000
const login = require('./netlify/functions/login')
const userInfo = require('./netlify/functions/userInfo')


const router = express.Router();

router.get('/login', (req, res) => {
   res.send(JSON.stringify(login.handler(req, res)));
});
router.get('/userInfo', (req, res) => {
    res.send(JSON.stringify(userInfo.handler()));
 });
 
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})