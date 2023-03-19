const express = require('express')

const {body , validationResult} = require('express-validator')

let data = require('../data')
const router = express.Router()

router.get('/tasks', (req , res , next) => {
    res.json({
        data : data , 
        message : "Request Successfully",
        status : 200 , 
    })
})

router.get('/task/:id' , (req , res , next) => {
    const task = data.find(task => task.id == req.params.id)
    if(!task) return res.status(404).json({data : null , message : "No such case was found" ,  status : 404})
    res.json({
        data : task , 
        message : "Request Successfully",
        status : 200
    })
})

router.post('/createTask',[
    body('email' , 'email must be valid...!').isEmail(),
    body('title' , 'title can not be empty...!').notEmpty(),
] , (req , res , next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({data : null , errors: errors.array() , message : "validation errors...!"})
    }
    data.push({id : data.length + 1, ...req.body})
    res.json({
        data : data , 
        message : "Request Successfully",
        status : 200
    })
})

router.put('/updateTask/:id',[
    body('email' , 'email must be valid...!').isEmail(),
    body('title' , 'title can not be empty...!').notEmpty(),
] , (req , res , next) => {
    const task = data.find(task => task.id == req.params.id)
    if(!task){
        return res.status(404).json({
            data:null , 
            message : "The task not found...!"
        })
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({data : null , errors: errors.array() , message : "validation errors...!"})
    }
    data = data.map(task => {
        if(task.id == req.params.id){
            return {...task , ...req.body}
        }
        return task
    })
    res.json({
        data : data , 
        message : "Request Successfully",
        status : 200
    })
})

router.delete("/deleteTask/:id" , (req , res) => {
    const task = data.find(task => task.id == req.params.id)
    if(!task){
        return res.status(404).json({
            data: null , 
            message : "the task not found...!"
        })
    }

    const index = data.indexOf(task)
    data.splice(index , 1)
    res.json({
        data : data , 
        message : "Request Successfully and delete item...",
        status : 200
    })
})

module.exports = router