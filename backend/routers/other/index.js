import express from 'express';

const otherThingsRouter = express.Router();


otherThingsRouter.get('/smth', (req, res) => {
  return res.send("hola esto es algo");
});



export default otherThingsRouter;