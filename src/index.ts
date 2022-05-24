import express from 'express';
import routes from './routes/index';

const app = express();
const port: number = 8080 as number;

app.get('/', (req, res) => {
  res.send('Welcome to the Image Processing API');
});

app.use('/api', routes);

app.listen(port, (): void => {
  console.log(`server is running at http://localhost:${port}`);
});

export default app;
