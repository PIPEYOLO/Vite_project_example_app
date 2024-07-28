import express from 'express';
import viteRouter from './routers/vite/index.js';
import otherThingsRouter from './routers/other/index.js';
import peopleRouter from './routers/people/index.js';



const app = express();


app.use('/api', otherThingsRouter);
app.use('/api/people', peopleRouter);

app.use(viteRouter);

export default app;



