 const { json } = require('body-parser');
 const express = require('express');
 const post = require('../model/post');
 const router = express();


 //Pillar los posts
 router.get('/', async (req,res) => {

     try {
     
       const posts = await post.find();
       res.json(posts);    

     } 
     catch (error) {
         
       res.json({message: error});   

     }

 })
 //Lanzar Posts
 router.post('/', async (req,res) => {

     const Post = new post({

         title: req.body.title,
         description: req.body.description

     });      

    try {
       
       const savedPost = await Post.save();
       res.json(savedPost); 

    } 
    catch(error){
        
       res.json({message: error}); 

    } 

 });
 
 router.get('/:postId', (req,res) => {

        console.log(req.params.postId);

 });



 module.exports = router;