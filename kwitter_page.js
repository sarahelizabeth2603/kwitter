//YOUR FIREBASE LINKS
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

user_name = localStorage.getItem("User_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        Name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>"+Name+"<img src = 'tick.png' class='user_tick'></h4>";
                        message_with_tag ="<h4 class='message_h4'>"+message+"</h4>";
                        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : "+like+"</span> </button>";
                        row= name_with_tag+message_with_tag+like_button+span_with_tag;
                        document.getElementById("output").innerHTML+=row;

                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id){
      console.log("Clicked on the like button "+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes= Number(likes)+1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like:update_likes
      });
}

function LogOut(){
      window.location = "index.html";
      localStorage.removeItem("User_name");
      localStorage.removeItem("room_name");
}