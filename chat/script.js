const conct=firebase.database();
const authid=localStorage.getItem('authid');;
const body = document.body;
const barid=window.location.search;
const roomid=barid.replace("?room=","");
var chatcode,owner,typeper;
var fetchusername,name
var userverified=false;
var typing=false;
var chatroomvalid=false;
var chatType;
authenticate();
checkroom();
if(roomid===""){
    alert("No room code provided. Please check the link and try again.");
    location.href="https://sharmapushkar2006.github.io/chatrooms/";
}

const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');


function send() {
    if(typeof fetchusername==="undefined" || fetchusername===null|| fetchusername===""){
        alert("Failed to fetch username. Please check your network.");
        location.href="https://sharmapushkar2006.github.io/chatrooms/login";
    }
    else{
        var message=document.getElementById("messageInput").value;
        if(message===""){
            console.log("Empty message. Not sending.");
        }
        else{
            conct.ref("rooms/"+roomid+"/messages").push({
                'sender':fetchusername,
                'message':message
        })
    }
 }
   document.getElementById("messageInput").value="";
}
function authenticate() {
    if(typeof authid==="undefined" || authid===null|| authid===""){
        location.href="https://sharmapushkar2006.github.io/chatrooms/login";
    }
    else{
        conct.ref("login/"+authid).on('value',function(snapshot){
            if(snapshot.exists()){
                fetchusername=snapshot.val().user;
                if(typeof fetchusername==="undefined" || fetchusername===null|| fetchusername===""){
                    alert("Failed to fetch username. Please check your network.");
                    location.href="https://sharmapushkar2006.github.io/chatrooms/";
                }
                else{
                    console.log("User authenticated successfully");
                }
            }
            else{
                alert("Session expired. Please login again.");
                localStorage.removeItem("authid");
                location.href="https://sharmapushkar2006.github.io/chatrooms/login";
            }
            
        });
        setTimeout(function(){
            userverified=true;
        },3000)
    }
}

function checkroom(){
    conct.ref("rooms/"+roomid).on('value',function(snapshot){
        if(snapshot.exists()){
            chatroomvalid=true;
            document.getElementById("chat-name").innerHTML=snapshot.val().name;
            conct.ref("rooms/"+roomid).on('value',function(snapshot){
                chatcode=snapshot.val().pass;
                name=snapshot.val().name;
                owner=snapshot.val().creater;
                typeper=snapshot.val().typing;
                chatType=snapshot.val().public;
            })
        }
        else{
            alert("Room Not Found on the server. Please check the room code and try again.");
            location.href="https://sharmapushkar2006.github.io/chatrooms/";
        }
    });
}
setTimeout(function(){
    if(chatroomvalid==true&&userverified==true){
        document.getElementById("loader").style.display="none";
        if(fetchusername===owner||chatType==="public"){
          console.log("Chat room is public or user is owner. Joining the chat room directly.");
          document.getElementById("roomauth").style.display="none";
          document.getElementById("input-container").style.display="block";
          document.getElementById("chat-div").style.display="block";
          fetchmessages();
        }
        else{
            document.getElementById("roomauth").style.display="block";
        }
    }
    else{
        alert("An error occured at our end. Please try again later.");
        location.href="";
    }
},5000)

const passwordcheck=()=>{
    var enteredpass=document.getElementById("room-password-input").value;
    if(enteredpass===chatcode){
        console.log("Password is correct. Joining the chat room.");
        document.getElementById("roomauth").style.display="none";
        document.getElementById("input-container").style.display="block";
        document.getElementById("chat-div").style.display="block";
        fetchmessages();
    }
    else{
        alert("Incorrect password. Please try again.");
        location.href="";
    }
}

const fetchmessages=()=>{
    conct.ref("rooms/"+roomid+"/messages").on('child_added',function(snapshot){
        var message=snapshot.val().message;
        var sender=snapshot.val().sender;
        document.getElementById("chat-div").innerHTML+=`<div class="chat-container"><span class="sender">${sender}:</span> ${message}</div>`;
    })
}


function share() {
  const copyText = "https://sharmapushkar2006.github.io/chatrooms/chat/?room="+roomid;

  navigator.clipboard.writeText(copyText).then(() => {
    alert("Link Copied to clipboard!");
  }).catch(err => {
    alert('Could not copy text: ', err);
  });
}


