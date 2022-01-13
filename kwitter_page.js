//YOUR FIRE BASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyAWa7A4Ou4MfEVdNEDFpY7PzporkQfbaAs",
  authDomain: "kwitter-3f78e.firebaseapp.com",
  databaseURL: "https://kwitter-3f78e-default-rtdb.firebaseio.com",
  projectId: "kwitter-3f78e",
  storageBucket: "kwitter-3f78e.appspot.com",
  messagingSenderId: "493960793388",
  appId: "1:493960793388:web:06f67a4028520f7232f089"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

msg_num = 1;
msg_likers = [user_name];
svg_path = "M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z";

function send()
{
  msg_likers = [user_name]
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    message_num:msg_num,
    likers:msg_likers,
    path:svg_path
  });
  document.getElementById("msg").value = "";
  getData();
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
	       console.log(message_data);
	       name = message_data['name'];
	       message = message_data['message'];
         msg_likers = message_data['likers'];
         msg_num = message_data['message_num'];
         like = msg_likers.length-1;
         console.log(msg_likers)
         name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         if (name != user_name){
          like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         }
         else if (name == user_name){
          like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)' disabled>";
         }
         span_with_tag = '<span id="span" style="font-size: 20px"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: inline-block; filter: invert(100%); width: 25px; height: 25px; margin-bottom: -5%; user-select: auto;"><g style="user-select: auto;" class="style-scope yt-icon"><path d="' + svg_path + '" style="user-select: auto;" class="style-scope yt-icon"></path></g></svg> '+ like +'</span></button>';
        if (msg_num > 1){
          row = "<hr>" + name_with_tag + message_with_tag +like_button + span_with_tag;  
        }
        else{
          row = name_with_tag + message_with_tag +like_button + span_with_tag;
        }
        msg_num += 1
        document.getElementById("output").innerHTML += row;
//End code
}});});}

getData();

function updateLike(message_id)
{
console.log("clicked on like button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
  if (!msg_likers.includes(user_name)){
    msg_likers.push(user_name)
    svg_path = "M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z";
  }
  else if (msg_likers.includes(user_name)){
    msg_likers.splice(msg_likers.findIndex(msg_likers => msg_likers === user_name), 1)
    svg_path = "M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z";
  }
  firebase.database().ref(room_name).child(message_id).update({
    likers : msg_likers,
    path : svg_path
  });
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
