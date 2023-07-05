const express = require('express');
const router = express.Router();
const ExaminationModel = require('../model/ExaminationModel');
const authorization = require('../middleware/authorization');

router.get("/getAllExams",async(req,res)=>{
    try{
        const exams = await ExaminationModel.find({});
        res.send(exams);
    }catch(err){
        res.status(400).json({message:err})
    }
});

//Create a exam

router.post("/createExam",authorization,async(req,res)=>{
    const exam = req.body;
    // console.log(exam);
    // console.log(req.userId);
    // console.log(req.name)
    try{
        const newExam = new ExaminationModel({
            exam_name: exam.exam_name,
            teacher_id: req.userId,
            teacher_name: req.name,
            exam_type: exam.exam_type,
            exam_time: exam.exam_time,
            exam_date: exam.exam_date
        });
        // console.log(newExam)
        const resp = await newExam.save();
        //  console.log(resp)
        res.status(201).send(resp);
    }catch(error){
        res.status(400).json({message:error})
    }
});

//get Exam by id

router.post('/getExamById',async(req,res)=>{
    const {exam_id} = req.body;
    //  console.log(exam_id)
    try{
        const resp = await ExaminationModel.findOne({_id : exam_id});
        //  console.log(resp)
        res.send(resp);
    }catch(err){
        res.status(400).json({message:err})
    }
})

router.post('/getExamByName',async(req,res)=>{
    const {exam_name} = req.body;
    //  console.log(exam_name)
    try{
        const resp = await ExaminationModel.findOne({exam_name : exam_name});
        //  console.log(resp)
        res.send(resp);
    }catch(err){
        res.status(400).json({message:err})
    }
})



module.exports = router