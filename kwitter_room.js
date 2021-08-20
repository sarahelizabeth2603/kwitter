//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyDIaaGrGq495U_ZzdclC5URCQc-A2R0wOY",
      authDomain: "kwitter-8bb6d.firebaseapp.com",
      databaseURL: "https://kwitter-8bb6d-default-rtdb.firebaseio.com",
      projectId: "kwitter-8bb6d",
      storageBucket: "kwitter-8bb6d.appspot.com",
      messagingSenderId: "62289659238",
      appId: "1:62289659238:web:ef416d9619e82ee7e5b4a7",
      measurementId: "G-ZSBGJ93SK6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("User_name");
document.getElementById("User_name").innerHTML = "Welcome " + userName + "!";

function addRoom() {
      roomName = document.getElementById("room_name").value;

      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room name "
      });

      localStorage.setItem("room_name", roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room_names = " + Room_names);

            row = "<div class = 'room_name ' id="+Room_names+" onclick='goToroom_name(this.id)'>#"+Room_names+"</div> <hr>";

            document.getElementById("output").innerHTML += row ;

                  //End code
            });
      });
}
getData();

function goToroom_name(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";

}

function LogOut(){
      localStorage.removeItem("User_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}