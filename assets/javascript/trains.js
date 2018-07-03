
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSHPT5Ec9qPtb0bpk4H6tu82r3Cv0h_lc",
    authDomain: "teste-80f90.firebaseapp.com",
    databaseURL: "https://teste-80f90.firebaseio.com",
    projectId: "teste-80f90",
    storageBucket: "teste-80f90.appspot.com",
    messagingSenderId: "520015397491"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var trainsRef = database.ref('trains');

// Initial Values
var name = "";
var destination = "";
var firsttraintime = "";
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function (event) {
    console.log("addtrainclicked");
    // Don't refresh the page!
    //event.preventDefault();

    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firsttraintime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    trainsRef.push({
        name: name,
        destination: destination,
        firsttraintime: firsttraintime,
        frequency: frequency
        //,        dateadded: firebase.database.ServerValue.TIMESTAMP
    });
    alert("Train has been added. (This schedule refreshes every 60 secs)");
});

$("#del-train").on("click", function (event) {
    trainName = $("#train-name-input").val().trim(); 
    var ref = trainsRef.orderByKey();

    ref.once("value").then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var childname = childSnapshot.val().Name; // match train name 
            if (name === childname) { // train name match database value
                childSnapshot.ref.remove(); // remove object
            }
        });
    });
});

// Firebase watcher + initial loader HINT: .on("value")
trainsRef.on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firsttraintime);
    console.log(snapshot.val().frequency);
    //console.log(snapshot.val().dateadded);

    // Get the to-do "value" from the textbox and store it a variable
    name = snapshot.val().name;
    destination = snapshot.val().destination;
    firsttraintime = snapshot.val().firsttraintime;
    frequency = snapshot.val().frequency;

    var randomDate = "02/23/1999";
    console.log(moment().format("DD/MM/YY hh:mm A"));

    console.log(name);
    console.log(destination);
    console.log(firsttraintime);
    console.log(moment(firsttraintime).diff(moment(), "minutes"));
    var months = moment(firsttraintime).diff(moment(), "minutes");
    console.log(frequency);

    // Create a new variable that will hold a "<th>" tag.
    var train = $("#train");

    var newrow = $("<tr>");
    var nextarrival = "15:30 PM";
    var minutesaway = "10";
    //            newrow.append("<td>" + name + "</td>"  + "<td>" + destination + "</td>" + "<td>" + firsttraintime + "</td>" + "<td>" + frequency + "</tr>") ;
    newrow.append("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + moment(firsttraintime).format("hh:mm A") + "</td>" + "<td>" + nextarrival + "</td>" + "<td>" + minutesaway + "</tr>");
    train.append(newrow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})



//$(document).on("click", "#train-add", addTrain)