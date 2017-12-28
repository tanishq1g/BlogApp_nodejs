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
    image: {type: String, default: "user_image_default.jpg"},
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
//making a model with the above schema and has methods on it
var Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES



app.listen(8081, function(){
    console.log("listening...");
});
