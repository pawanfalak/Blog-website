var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogdb');

var PostSchema = mongoose.Schema({
    title: {type: String,required: true},
    body:String,
    tag: {type: String,enum: ['POLITICS','EDUCATION','ECONOMY']},
    posted:{type: Date,default: Date.now}
}, {collection:'post'});
var PostModel= mongoose.model('PostModel',PostSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/blogpost",createPost);
app.get("/api/blogpost",getAllPosts);
app.delete("/api/blogpost/:id",deletePost);

function deletePost(req,res) {
    var postID=req.params.id;
    PostModel
        .remove({_id:postID})
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(400);
            }
        )
}

function getAllPosts(req,res) {
    PostModel
        .find()
        .then(
            function (posts) {
                res.json(posts);
            },
            function (err) {
                res.sendStatus(400);
            }
        );

}

function createPost(req,res){
    var post=req.body;
    console.log(post);
    PostModel
        .create(post)
        .then(
            function(PostObj){
                res.json(200);
            },
            function(error){
                res.sendStatus(400);
            }
        );

}

app.listen(3000);
