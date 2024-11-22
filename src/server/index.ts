import express, { Request, Response } from 'express';
import { App } from '../client/app/app.ts';

// create app
const app = express();
app.use(express.urlencoded({ extended: false }));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (_: Request, res: Response) => {
  res.send(App());
});

app.get('/maps', (_: Request, res: Response) => {
  res.send([]);
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});