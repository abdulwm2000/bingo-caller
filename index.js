var letters = ["B", "I", "N", "G", "O"];
var numbers = Array.from({length: 75}, (_, i) => i + 1);  // Create array of numbers 1-75
var numberIndex = 0;  // Track the index of the last generated number

function generateCall(previousCalls) {
    var letter = letters[Math.floor(Math.random() * letters.length)];
    var numberIndex = Math.floor(Math.random() * numbers.length);
    var number = numbers[numberIndex];
    numberIndex = (numberIndex + 1) % numbers.length;  // Loop back to beginning if at end
    var call = letter + " " + number;
    while (previousCalls.includes(call)) {  // Check if call has been made before
        letter = letters[Math.floor(Math.random() * letters.length)];
        numberIndex = Math.floor(Math.random() * numbers.length); 
        number = numbers[numberIndex];
        // numberIndex = (numberIndex + 1) % numbers.length;  // Loop back to beginning if at end
        call = letter + " " + number;
    }
    if (previousCalls.length >= 10000) {
        previousCalls.shift();  // Remove oldest call if array is too long
    }
    previousCalls.push(call);
    return call;
}

var previousCalls = [];

var callButton = document.getElementById("call-button");
var callDisplay = document.getElementById("call");
var previousCallsList = document.getElementById("previous-calls");

callButton.addEventListener("click", function() {
    var call = generateCall(previousCalls);
    callDisplay.innerHTML = call;
    previousCallsList.innerHTML = "";  // Clear previous calls list
    for (var i = 0; i < previousCalls.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = previousCalls[i];
        previousCallsList.appendChild(li);
    }
    console.log("Previous calls:", previousCalls);
});
