import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import TodosController from './controllers/TodosController';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// The route for getting a list of all todos
app.get('/todos', async (req, res) => {
    const todos = await TodosController.getAllTodos();  
    res.status(200).json(todos);
});

// The route for getting a list of all todos, but with a delay
// (to display the loading component better)
app.get('/todos-delay', async (req, res) => {
    const todos = await TodosController.getAllTodos();  
    setTimeout(() => {
        res.status(200).json(todos);
    }, 2000);
});

// The route for creating new todo-list items
app.post('/todos', async (req, res) => {
    const { text, isCompleted } = req.body;

    if (text) {
        const insertedTodo = await TodosController.createTodo({
            text,
            isCompleted,
        });
        res.status(200).json(insertedTodo);
    } else {
        res.status(400).json({ message: 'Request body should have a text property' });
    }
});

app.post('/todos/:id/completed', async (req, res) => {
    const { id } = req.params;
    const updatedTodo = await TodosController.completeTodo(id);
    res.status(200).json(updatedTodo);
})

// The route for deleting a todo-list item
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await TodosController.deleteTodo(id);
    res.status(200).json({ id });
});

app.listen(8080, () => console.log("Server listening on port 8080"));
