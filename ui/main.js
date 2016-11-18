//submit name
var submit=document.getElementById('submit_btn');
submit.onclick = function() {
        //creating a request object
    var request=new XMLHttpRequest();
    //capture the response and store  it in a variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //take some action
            if(request.status === 200) {
                
                  //capture a list of names and render it as a list
   console.log('user logged in');
   alert('logged in successfully');
            }else if (request.status === 403) {
                alert('username/password is invalid');
            }else if (request.status === 500) {
                alert('something went wrong wit the server');
        }
        }
        //not yet done
    };
//make the request
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://ysnigdha.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-type','application/json');
request.send(JSON.stringify({username :username , password:password}));
};