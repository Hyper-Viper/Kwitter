function addUser(){
    user_name=document.getElementById("user_name").value;
    if (user_name.trim().length != 0){
        localStorage.setItem("user_name", user_name);
        window.location="kwitter_room.html";
    }
    else if (user_name.trim().length == 0){
        document.getElementById("user_name").value = "";
    }
}
