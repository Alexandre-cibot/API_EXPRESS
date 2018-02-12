const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

let todos = [
  {
    id: 1,
    text: "Tache 1",
    complete: false 
  },
  {
    id: 2,
    text: "Tache 2",
    complete: false 
  },
  {
    id: 3,
    text: "Tache 3",
    complete: true 
  }
];


app.get('/todos', (req, res) => {
  res.send(todos);
})

app.post('/todos', (req, res) => {
  
  const text = req.body.text;
  if (text) {
    const newTodo = createNewTodo(text);
    todos.unshift(newTodo);
    res.send(newTodo);
  } else {
    res.status('400').send('Text has to be defined');
  }
})

app.put('/todos', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === req.body.id);
  if (todoIndex > -1) {
    const currentTodo = todos[todoIndex];
    currentTodo.complete = !currentTodo.complete;
    res.send(currentTodo);
  } else {
    res.status(400).send('Un ID est neccesaire');
  }
})
app.listen(3000, () => {
})

function createNewTodo(text) {
  const todo = {
    id: Math.round(Math.random() * 1000000000),
    text,
    complete: false
  }
  return todo;
}