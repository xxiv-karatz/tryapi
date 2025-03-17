// Import Express
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data to work with
let tasks = [
    { id: 1, title: 'Buy groceries', done: false },
    { id: 2, title: 'Finish homework', done: false }
];

// Route to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Route to create a new task
app.post('/tasks', (req, res) => {
    const { title, done } = req.body;
    const newTask = { id: tasks.length + 1, title, done: done || false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route to update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, done } = req.body;
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.done = done !== undefined ? done : task.done;

    res.json(task);
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
