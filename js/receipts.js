config = {
    apiKey : config1.apiKey,
    authDomain: config1.authDomain,
    databaseURL: config1.databaseURL,
    projectId: config1.projectId,
    storageBucket: config1.storageBucket,
    messageingSenderId: config1.messagingSenderId
}
var database = firebase.database();
  createItem();
// var prices = [];
// var dates = [];
// var categories = [];
// var locations = [];
// var descriptions = [];





// getting data from input boxes
let submitButton = document.getElementById("submitButton").addEventListener("click", createItem);

// using the enter key to submit the form(only works in the description box)
document.getElementById('descriptionBox').addEventListener("keyup", function() {
    if (event.keyCode === 13)
        document.getElementById("submitButton").click();
});

// function to get form items and push them into arrays 
function createItem() {
    let price = document.getElementById("priceBox").value;
    let date = document.getElementById("dateBox").value;
    let category = document.getElementById("categoryBox").value;
    let location = document.getElementById("locationBox").value;
    let description = document.getElementById("descriptionBox").value;
    if (price && date && category && location && description) {
        resetForm();
        console.log(price);


        let receipts = {
          price: price,
          date: date,
          category: category,
          location: location, 
          description: description
      }
      pushFireBase(receipts); // pushing the receipts object to the pushFirebase function to be sent to the database
      console.log(receipts);
    } 

}

// reset the form
function resetForm() {
  document.getElementById("priceBox").value = "";
  document.getElementById("dateBox").value = "";
  document.getElementById("categoryBox").value = "";
  document.getElementById("locationBox").value = "";
  document.getElementById("descriptionBox").value = "";
}

function pushFireBase(data) {
  const fb = firebase.database().ref(); // setting fb variable to equal the database
  fb.child('receipts/').push(data); // creating a child of the database called receipts, and pushing the object from the create item function
 
}
