"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json(todos);
});
router.post('/', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "added todo", todo: newTodo });
});
router.put('/todo/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === id);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "updates todos", todos: todos });
    }
    res.status(404).json({ message: "cound not find todo" });
});
router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: "deleted" });
});
exports.default = router;
