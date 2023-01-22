import express from 'express'

const server = express()
// server.use()

const port: number = 5000

server.listen(port, () => console.log(`Server running on port ${port}`))