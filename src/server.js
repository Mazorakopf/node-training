import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './api/routes/userRoutes';

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use('/api/users', userRouter);

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));
