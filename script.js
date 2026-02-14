const s = firebase.database();
var roomt="";
var username;
var localusername=localStorage.getItem("username");
var localauthid=localStorage.getItem("authid");
if(typeof localauthid==="undefined"||localauthid===null||localauthid==""){
    location.href="login";
}
else{
    console.log("An Auth ID is present");
    s.ref("login/"+localauthid).on('value',function(snapshot) {
         username = snapshot.val().user;
    });
    setTimeout(function(){
        if(typeof username==="undefined"||username===null||username==""){
            location.href="login";
        }
        else{
            document.getElementById("uname").innerHTML=username;
            localStorage.setItem("username",username);
            document.getElementById("bottom-content").style.display="block";
            document.getElementById("wait-1").style.display="none";
            document.getElementById("top-bar-1").style.display="block";
            document.getElementById("create").style.display="block";
            //document.getElementById("past-chat").style.display="block";
            document.getElementById("uname").innerHTML=username;
        }
    },4000);
}




const join=()=>{
    var roomcode=document.getElementById("roomid").value;
    if(typeof roomcode==="undefined"||roomcode===null||roomcode==""){
        alert("Please enter a valid room code");
        return;
    }
    else{
        location.href="chat?room="+roomcode;
    }
    
}

const create=()=>{
    document.getElementById("main-create-btn").disabled=true;
    document.getElementById("main-create-btn").innerHTML="Server is creating your chat room... Please wait";
    var name=document.getElementById("room-name").value;
    var pass=document.getElementById("room-pass").value;
    if(typeof name==="undefined"||name===null||name==""){
        alert("Please enter a valid room name");
    }
    else{
        Room(8);
        s.ref("rooms/"+roomt).once('value').then(function(snapshot) {
            if(snapshot.exists()){
                alert("Room code generation failed!! Try Again");
                
            }
            else{
                s.ref("rooms/"+roomt).set({
                    name:name,
                    pass:pass,
                    creator:username,
                    typing:'yes',
                    public:'private',
                    created:new Date()
                 });
                s.ref("prevchat/"+username).push().set({
                    'name':name,
                    'code':roomt
                })
                 setTimeout(function(){
                    location.href="chat?room="+roomt;
                },4000);
            }
        });
    }
}







const cwin=() => {
    document.getElementById("create").style.display="none";
    document.getElementById("create-window").style.display="block";
    document.getElementById("join-window").style.display="none";
}

const jwin=() => {
    document.getElementById("create").style.display="none";
    document.getElementById("join-window").style.display="block";
    document.getElementById("create-window").style.display="none";
}










function Room(length) {

  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    roomt += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }

}

function logout(){
    localStorage.removeItem("authid");
    location.href="login";

}



