const express = require('express');
const router = express.Router();
const QuestionsModel = require('../model/QuestionsModel');


// router.get("/getAllQuestions",async(req,res)=>{
//     try{
//         const questions = await QuestionsModel.find({});
//         res.send(questions);
//     }catch(err){
//         res.status(400).json({message:err})
//     }
// });

//get All questions of an exam

router.post("/getAllQuestions",async(req,res)=>{
    const {exam_id} = req.body; // The ID of the exam
    //  console.log(exam_id)
    try{
        const questions = await QuestionsModel.find({exam_id: exam_id});
        //  console.log(questions);
        res.send(questions);
    }catch(err){
        res.status(400).json({message:err})
    }
});


// router.post("/addNewQuestion",async(req,res)=>{
//     const question = req.body;
//     // console.log(question.options)
//     try{
//         const newQuestion = new QuestionsModel({
//             title: question.title,
//             options: question.options,
//             answer: question.answer
//         });

//         await newQuestion.save();
//         res.status(201).send("Question added successfully..")
        
//     }catch(err){
//         res.status(400).json({message:err});
//     }
// });

//Add Questions 

router.post("/addNewQuestion",async(req,res)=>{
    const {exam_id,questions} = req.body;
    //  console.log(exam_id)
    //   console.log(questions)
    try{
        const question = new QuestionsModel({
            exam_id: exam_id,
            questions: questions
        })
        // const resp = await QuestionsModel.findByIdAndUpdate(exam_id, { $push: { questions: questions } });
        // console.log(resp);
        await question.save();
        res.status(201).send("Question added successfully..");
    }catch(err){
        console.log(err)
        res.status(400).json({message:err});
    }
});

// //Update Existing question

// router.post("/updateQuestion",async(req,res)=>{
//     const updatedQuestion = req.body;
//     //  console.log(updatedQuestion._id);
//     try{
//         const question = await QuestionsModel.findOne({ _id: updatedQuestion._id});
//         // console.log(question.title);
//         (question.title = updatedQuestion.title),
//         (question.options = updatedQuestion.options),
//         (question.answer = updatedQuestion.answer);

//         await question.save();
//         res.status(200).send("question updated successfully..");
//     }catch(err){
//         res.status(400).json({message:err});
//     }
// });


//Update Existing question

router.post("/updateQuestion",async(req,res)=>{
    const {exam_id,questionIndex,updatedQuestion} = req.body;
    //  console.log(questionIndex);
    try{
        await QuestionsModel.findOneAndUpdate(
            { exam_id: exam_id, 'questions._id': questionIndex },
            { $set: { 'questions': updatedQuestion } }
          );
        
        res.status(200).send("question updated successfully..");
    }catch(err){
        res.status(400).json({message:err});
    }
});

// router.post("/deleteQuestion",async(req,res)=>{
//     const {questionId} = req.body;
//     try{
//         await  Examination.findByIdAndDelete({_id : questionId});
//         res.status(200).send("Question deleted successfully");
//     }catch(error){
//         res.status(400).send(error);
//     }
// })


//delete a Question

router.post("/deleteQuestion",async(req,res)=>{
    const {_id} = req.body;
    
    // console.log(examId)
    // console.log(questionIndex);
    try{
        await QuestionsModel.findByIdAndDelete({ _id: _id } );
        res.status(200).send("Question deleted successfully");
    }catch(error){
        res.status(400).send(error);
    }
})






module.exports = router;