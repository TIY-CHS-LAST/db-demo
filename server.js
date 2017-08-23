const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  const peeps = dal.getPeople()
  res.render('list', { people: peeps.slice(0, 3) })
})

app.listen(3000, function () {
  console.log('server started on port: 3000')
})
