import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import cors from 'cors'
import api from './routes/api.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

// CORS configuration
const corsOptions = {
  origin: '*',  // Replace with your frontend origin
  methods: ['GET', 'POST'],      // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};
// Use CORS middleware
server.use(cors(corsOptions));

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/llm', api)

export default server
