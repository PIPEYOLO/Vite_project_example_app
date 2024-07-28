import { config } from 'dotenv';
import { createServer } from 'node:http';
import process from 'node:process';
import app from './backend/index.js';
config();

const { PORT, IP, NODE_ENV } = process.env;

const server = createServer(app);


server.listen(PORT, IP, ()=> {
  console.log(`Server on ${IP}:${PORT} in ${NODE_ENV}`);
})