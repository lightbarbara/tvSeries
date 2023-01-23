import express from 'express'
import router from './routes/index.js'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(cors())
server.use(router)

const port: number = 5000

server.listen(port, () => console.log(`Server running on port ${port}`))