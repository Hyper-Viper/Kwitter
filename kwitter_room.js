// Your web app's Firebase configuration
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
    firebase.initializeApp(firebaseConfig);

//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

room_num = 1
Room_names = []
function addRoom(){
      room_name = document.getElementById("room_name").value;
      if (room_name.trim().length != 0){
            firebase.database().ref("/").child(room_name).update({purpose:"Adding Room Name"});
            localStorage.setItem("room_name", room_name);
            window.location = "kwitter_page.html";
      }
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_name = childKey;
      Room_names.push(Room_name)
      //Start code
      console.log("Room Name - " + Room_name);
      if (Room_names.length > 1){
            row = "<hr><div class='room_name' id=" + Room_name + " onclick='redirectToRoomName(this.id)'>#" + Room_name + "</div>";
      }
      else {
            row = "<div class='room_name' id=" + Room_name + " onclick='redirectToRoomName(this.id)'>#" + Room_name + "</div>"
      }
      room_num += 1
      document.getElementById("output").innerHTML += row;
      console.log("Room Names - " + Room_names);
      //End code
});});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}