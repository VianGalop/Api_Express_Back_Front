import express from 'express'
import { PORT } from './config/config.js'
import imagenesRouter from './routes/imagenes.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use('/api/imagen', imagenesRouter)
app.use('/api/users', userRouter)

// Inicio del servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
