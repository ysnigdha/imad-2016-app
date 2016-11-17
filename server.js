var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user: 'ysnigdha',
    database:'ysnigdha',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
function createTemplate (data) {
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
var htmlTemplate = `
<html>
    <head>
        <title> ${title}
        </title>
         <meta name="viewport" content="width=device-width, intial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>
         ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
        ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //how to create a hash?
    var hashed =crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
    
}

app.get('/hash/:input',function(req, res){

var hashedString = hash(req.params.input,'this-is-a-random-string');
res.send(hashedString);
});

app.get('/create-user',function(req,res){
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbString = hash(password,salt);
pool.query('INSERT INTO "user" (username ,password) VALUES($1,$2)',  [username,dbString] function(err,result) {
});
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
//select request 
//return a response
pool.query('SELECT * FROM test',function(err,result) {
  if(err) {
      res.status(500).send(err.toString());
  } else {
      res.send(JSON.stringify(result.rows));
  }
});
});

var counter=0;
app.get('/counter',function(req,res) {
   counter=counter+1;
   res.send(counter.toString());
});
var names=[];
app.get('/submit-name',function(req,res) {//url:/submit-name?name=hhhhh
    //get te name from request

    var name=req.query.name;
    names.push(name);
    //json stands for java script object notataion
    
    res.send(JSON.stringify(names));//1000
    
});
app.get('/articles/:articleName',function(req, res) 
{
    //aticleName=article-one
    //articles[articleName]= content object for article-one
    //select *from article where title='article-one'
     pool.query("SELECT * FROM article WHERE title= $1", [+req.params.articleName],function(err,result) {
     
     if(err) {
         res.status(500).send(err.toString());
     }    
     else
     {
         if(result.rows.length === 0) {
             res.ststus(404).send('Article not found');
         }else {
             var articleData =result.rows[0];
        res.send(createTemplate(articleData)); 
         }
     }
     });
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});