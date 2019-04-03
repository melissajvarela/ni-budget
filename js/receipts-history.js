config = {
    apiKey : config1.apiKey,
    authDomain: config1.authDomain,
    databaseURL: config1.databaseURL,
    projectId: config1.projectId,
    storageBucket: config1.storageBucket,
    messageingSenderId: config1.messagingSenderId
};
var database = firebase.database();

let categories = {};
let sumOfPurchases = 0;
let budget = 700;



let dbref = firebase.database(); // setting var equal to the firebase database
let receiptRef = dbref.ref('receipts'); // referencing the receipts data in the database
receiptRef.on('value', function(snapshot) {  // getting snapshot of the values of reciept reference
    snapshot.forEach(function(childSnapshot) { // getting snap shot for each of the 'children' of receipt
    
        let childData = childSnapshot.val(); // setting childData equal to the values of snapshot of children
        // console.log(childData);
        let recPrice = childData.price;
        let recDate = childData.date;
        let recCategory = childData.category;  // settting variables to equal each of the values of the objects
        let recLocation = childData.location;
        let recDescription = childData.description; 
        // let userID = recDescription + recLocation;

            if (categories[recCategory]) {
                categories[recCategory] += 1;
            } else {
                categories[recCategory] = 1;

        }

        sumOfPurchases = sumOfPurchases + parseFloat(childData.price);
        addReceipt(recPrice, recDate, recCategory, recLocation, recDescription);

    })
    makeChart(categories) // put the function call here to have it run out side of the for loop
    console.log(sumOfPurchases);
    makeBarChart(sumOfPurchases);
})


let list = document.getElementById("receiptList"); // creating a reference to the list in html
function addReceipt(price, date, category, location, description ) {
    // let list = document.getElementById("receiptList");

    // adding the new reciept items to the list 
    let newItem = document.createElement("li");
    newItem.innerText = "Price: " + price + "\nDate: " + date + "\nCategory: " + category + "\nLocation: " + location + "\nDescription: " + description;
    newItem.classList.add("list-item");
    
    list.appendChild(newItem); 

    
    // adding double click delete feature
    newItem.addEventListener('dblclick', function() {
        console.log("double clicked");
        // let receiptItem = dbref.ref('receipts/');
        // receiptItem.remove('');
        list.removeChild(newItem);
    })
};


// trying to get chart to get info dynamiclly

function makeChart(categories){
    
let data = {
    datasets: [{
        data: [
             categories.food,
             categories.bills,
             categories.entertainment, 
             categories.personal,
             categories.clothing,
             categories.miscellaneous
        ],
        backgroundColor: [
            'blue',
            'red',
            'green',
            'orange',
            'teal',
            'pink'
        ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Food',
        'Bills',
        'Entertainment',
        'Personal',
        'Clothing',
        'Miscellaneous'
    ]
};
let options = {
    cutoutPercentage: 40,
    hoverBackgroundColor: "blue"
}

let chrt = document.getElementById('mycanvas').getContext('2d');
var myDoughnutChart = new Chart(chrt, {
    type: 'pie',
    data: data,
    options: options
    
});

}

function makeBarChart(sum) {
    let data = {
        labels: [
            'Money Spent'
        ],
        datasets: [{
            label: "Budget",
            backgroundColor: ['limegreen'],
            hoverBackgroundColor: ["blue"],
            data: [
                sum,
                budget,
                0
            ]
        }]
    }

    let options = {
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0
                    }
                }],
                yAxes: [{

                }]
            }
        }
    }



    
let barChrt = document.getElementById('barChart').getContext('2d');
var myBarChart = new Chart(barChrt, {
    type: 'horizontalBar',
    data: data,
    options: options
});




}