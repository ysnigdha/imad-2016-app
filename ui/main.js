//counter code
var button=document.getElementById('counter');
button.onclick = function ()
{
    //create a request object
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable
    
    request.onreadystatechange = function ()    {
    if(request.readyState === XMLHttpRequest.DONE) {
        //take some action
        if(request.status === 200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
   //not yet done 
    };
    //make the request
    request.open('GET','http://ysnigdha.imad.hasura-app.io/counter',true);
    request.send(null);
   };
   //servlet name
   var nameInput=document.getElementById('name');
   var name=name.Input.value;
   var submit=document.getElementById('submit_btn');
   submit.onclick = function() {
       //make a request to the server and send the name 
       //cpture  a list of name and render it as a list
       var name=["name1","name2","name3"];
       var list='';
       for (var i=0;i<names.length;i++) {
           list+='<li>' +names[i] +'<li>';
       }
       var ul=document.getElementById('namelist');
       ul.innerHTML =list;
   };
   