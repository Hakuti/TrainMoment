var config = {
  apiKey: "AIzaSyADRlMiMKx2WeNkNnlDqkICZZDcWNHV2m0",
  authDomain: "train-3ec11.firebaseapp.com",
  databaseURL: "https://train-3ec11.firebaseio.com",
  projectId: "train-3ec11",
  storageBucket: "train-3ec11.appspot.com",
  messagingSenderId: "96539902296"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

$("#submitButton").on("click", function() {
  event.preventDefault();
  let trainNameInput = $("#trainNameInput")
    .val()
    .trim();
  let destinationInput = $("#destinationInput")
    .val()
    .trim();
  let firstTrainInput = $("#firstTrainInput")
    .val()
    .trim();
  let frequencyInput = $("#frequencyInput")
    .val()
    .trim();

  dataRef.ref().push({
    trainName: trainNameInput,
    destination: destinationInput,
    firstTrain: firstTrainInput,
    frequency: frequencyInput,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

dataRef.ref().on(
  "child_added",
  function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().dateAdded);

    var tFrequency = snapshot.val().frequency;

    var firstTime = snapshot.val().firstTrain;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Change the HTML to reflect
    // $("#name-display").text(snapshot.val().name);
    // $("#email-display").text(snapshot.val().email);
    // $("#age-display").text(snapshot.val().age);
    // $("#comment-display").text(snapshot.val().comment);

    // Handle the errors

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().dateAdded);

    $("tbody").append(
      "<tr><td>" +
        snapshot.val().trainName +
        "</td>" +
        "<td>" +
        snapshot.val().destination +
        "</td>" +
        "<td>" +
        snapshot.val().frequency +
        "</td>" +
        "<td>" +
        moment(nextTrain).format("hh:mm") +
        "</td>" +
        "<td>" +
        tMinutesTillTrain +
        "</td></tr>"
    );
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

// var aTime = "17:33";
// var timeArr = aTime.split(":");
// console.log(timeArr);

// var trainTime = moment()
//   .hours(timeArr[0])
//   .minutes(timeArr[1]);

// var maxMoment = moment.max(moment(), trainTime);
// console.log(maxMoment);
