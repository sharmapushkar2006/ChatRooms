var token = window.location.search;
var savetoken = token.replace("?authid=","");   
if(savetoken==""){
    //location.href="https://pushkarsharma2006.github.io/login?redirect=about:blank"
}
else{
    localStorage.setItem("authid",savetoken);
    location.href="../index.html"
}