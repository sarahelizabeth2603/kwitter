function addUser(){
    userName = document.getElementById("user_name").value;

    localStorage.setItem("User_name",userName);
    window.location = "kwitter_room.html";
}