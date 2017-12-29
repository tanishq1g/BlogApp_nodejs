var express =require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//to connect mongodb
mongoose.connect("mongodb://localhost/BlogApp_nodejs");
//to render ejs files
app.set('view engine','ejs');
//to serve custom style sheets
app.use(express.static("public"));
//for post routes
app.use(bodyParser.urlencoded({extended: true}));


//mongoose schema db
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "http://www.teamkrishna.in/images/developer/default_user-2.jpg"},
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
//making a model with the above schema and has methods on it
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "testing",
//     body: 'i am thrilled'
// });

//RESTFUL ROUTES


app.get('/',function(req,res){
    res.redirect("/blogs");
});

//index - get
app.get('/blogs',function(req,res){
    // res.render("index");
    Blog.find({},function(err,Blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{Blogs: Blogs});
        }
    });
});


//new - get
app.get('/blogs/new',function(req,res){
    res.render('new');
});

//create - Post
app.post('/blogs',function(req,res){
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect('/blogs');
        }
    });
});

//show - get
app.get('/blogs/:id',function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('index');
        }
        else{
            res.render('show',{blog: foundBlog});
        }
    });
});

app.listen(8081, function(){
    console.log("listening...");
});
