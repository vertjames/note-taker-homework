const express = require("express")
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

app.listen(3000, () => console.log('http://localhost:3000'))
