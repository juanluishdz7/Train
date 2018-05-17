//initializes firebase
 var config = {
  apiKey: "AIzaSyA8BCOTozm5k2_VCxvJDu5fdHQsaU43lWQ",
  authDomain: "train-hwk.firebaseapp.com",
  databaseURL: "https://train-hwk.firebaseio.com",
  projectId: "train-hwk",
  storageBucket: "train-hwk.appspot.com",
  messagingSenderId: "581859533705"
};
firebase.initializeApp(config);

var database = firebase.database();

//function to add train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var train = $("#trainame-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var ttime = $("#ttime-input").val().trim();
  var freq = $("#freq-input").val().trim();

  var newtrain = {
    name: train,
    dest: dest,
    time: ttime,
    freq: freq
  };
  database.ref().push(newtrain);

//clears txt boxes
  $("#trainame-input").val("");
  $("#dest-input").val("");
  $("#ttime-input").val("");
  $("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  

  var train = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var ttime = childSnapshot.val().time;
  var freq = childSnapshot.val().freq;

  var timeconv = moment(ttime, "HH:mm").subtract(1, "years");  
  var trainDiff = moment().diff(moment(timeconv), "m");
  var trainRe = trainDiff % freq;
  var minArr = freq - trainRe;
  var next = moment().add(minArr, "m").format("HH:mm");

  var currentTime = moment().format("HH:mm");

  $(".lead").text("Current Time:" + currentTime);
  $("#schedule > tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + next + "</td><td>" + minArr + "</td></tr>");

})