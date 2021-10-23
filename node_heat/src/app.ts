import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { router } from './routes';

const app = express();
app.use(cors())

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors:{
    origin: "*",
  }
});

app.use(express.json());

app.use(router);

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  response.json(code);
});

export { httpServer, io }