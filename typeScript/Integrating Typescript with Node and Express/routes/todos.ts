import { Router } from "express";
import {Todo} from '../models/todo'

const router=Router();
let todos:Todo[]=[]

router.get('/',(req,res,next)=>{
  res.status(200).json(todos)
})

router.post('/',(req,res,next)=>{
  const newTodo:Todo={
    id:new Date().toISOString(),
    text:req.body.text
  }
  todos.push(newTodo)
  res.status(201).json({message:"added todo",todo:newTodo})
})

router.put('/todo/:todoId',(req,res,next)=>{
  const id=req.params.todoId;
  const todoIndex=todos.findIndex(todoItem=>todoItem.id===id)
  if(todoIndex>=0){
    todos[todoIndex]={id:todos[todoIndex].id,text:req.body.text};
    return res.status(200).json({message:"updates todos",todos:todos})
  }
  res.status(404).json({message:"cound not find todo"})
})

router.delete('/todo/:todoId',(req,res,next)=>{
  todos=todos.filter(todoItem=>todoItem.id!==req.params.todoId)
  res.status(200).json({message:"deleted"})
})

export default router;