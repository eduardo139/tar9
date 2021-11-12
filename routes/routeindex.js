const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async function(req,res){
  var posts  = await Post.find()
  console.log(posts) 
  res.render('index', {posts})
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

// Punto 4 de la tarea
router.post('/newPost', async (req,res) =>{

  var post = new Post(req.body)
  console.log(post)
  await post.save()
  res.redirect('/')

});

// Punto 5 de la tarea
router.get('/', async function(req,res){

  var posts  = await Post.find()
  console.log(posts) 
 res.render('index', {posts})
 });

 // Punto 6 de la tarea
 router.get('/edit/:id',   async(req,res) =>{
   var id = req.params.id
   var post = await Post.findById(id)
   res.render('edit', {post})
})

router.post('/edit/:id',   async(req,res) =>{
  console.log(req.body)
  var id = req.params.id
  await Post.updateOne({_id: id}, req.body)
  res.redirect('/')
})

// Punto 7 de la tarea
router.get('/delete/:id',  async (req,res) =>{
  
  var id  = req.params.id
  var post = await Post.findById(id)
  res.render('delete', {post})
})

router.post('/delete/:id',   async(req,res) =>{
  console.log(req.body)
  var id = req.params.id
  await Post.remove({_id: id})
  res.redirect('/')
})

module.exports = router;