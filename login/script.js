var token = window.location.search;
var savetoken = token.replace("?authid=","");   
if(savetoken==""){
    location.href="https://pushkarsharma2006.github.io/login?c=https://sharmapushkar2006.github.io/chatrooms/login";
}
else{
    localStorage.setItem("authid",savetoken);
    location.href="https://sharmapushkar2006.github.io/chatrooms/";
}
