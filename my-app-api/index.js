const app = require('./config/express')
require('./config/mongoose')
const router = require('./router')
const security = require('./config/security')
const fs = require('fs')
const http = require('http')
const port=3000

router(app)
app.listen(port, () => {
    console.info(
        `Server started on port http://localhost:${port}`
    )
})