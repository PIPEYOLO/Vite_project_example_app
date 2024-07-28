import express from 'express';

const people = [
  {
    "id": 1,
    "name": "Juan Pérez",
    "age": 30
  },
  {
    "id": 2,
    "name": "Ana Gómez",
    "age": 25
  },
  {
    "id": 3,
    "name": "Luis Martínez",
    "age": 28
  },
  {
    "id": 4,
    "name": "María Fernández",
    "age": 22
  },
  {
    "id": 5,
    "name": "Carlos García",
    "age": 35
  }
]

const peopleRouter = express.Router();

peopleRouter.get("/", (req, res) => {
  return res.json({ data: people });
})


export default peopleRouter;