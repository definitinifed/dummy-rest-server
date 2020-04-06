const express = require('express')
const audit = require('express-request-logger')
const bodyParser = require('body-parser')
const cors = require('cors');
const swagger = require('./swagger-integration');
const appointment = require('./api/appointment');

const port = process.env.PORT || 80;

const app = express()
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// audit
app.use(audit.create(console))

app.use(appointment);

swagger(app);
app.listen(port, () => console.log(`Request Logger app listening on port ${port}!`))