const express = require('express')
const audit = require('express-request-logger')
const bodyParser = require('body-parser')
const port = process.env.PORT || 80;

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// audit
app.use(audit.create(console))

app.use('/', function (req, res) {
  const bodystr = JSON.stringify(req.body);
  console.log('body:', bodystr);
  res.send('success body:' + bodystr);
});

app.listen(port, () => console.log(`Request Logger app listening on port ${port}!`))