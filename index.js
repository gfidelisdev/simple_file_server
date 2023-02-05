const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const secretKey = "secret-key"

app.get("/pdf/:filename", (req, res) => {
    const { filename } = req.params
    const filePath = path.join(__dirname, "files", filename)
    console.log(req.params)
    if (req.query.key !== secretKey) {
        return res.status(401).send("Unauthorized")
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found")
    }

    res.contentType("application/pdf")
    res.sendFile(filePath)
})

app.listen(3000, () => console.log("Listening on port 3000"))
