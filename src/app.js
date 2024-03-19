import express from 'express'
import cors from 'cors'
import router  from './routes.js'

const app = express()

app.use(express.json({ limit: '100mb' }))
app.use(cors())
app.use(router)

export default app