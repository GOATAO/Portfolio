// getting all needed elements
const caloriesForm = document.getElementById("calories-form")
const maleInput = document.getElementById("male-input");
const femaleInput = document.getElementById("female-input");
const otherInput = document.getElementById("other-input");

const ageInput = document.getElementById("age-input");
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");

const freqInput = document.getElementById("training-frequency");

const calcBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");

const bmrOutput = document.getElementById("bmrSpan");
const proteinOutput = document.getElementById("proteinSpan");
const fatOutput = document.getElementById("fatSpan");

// getting the calories elements
const caloriesOutput = document.querySelectorAll(".calories-span");

// data fields
let isMale = false;
let isFemale = false;
let age = 0;
let height = 0;
let weight = 0;
let freq = 0; 


// function to handle when calculate is pressed
function calculate(e){
    e.preventDefault();
    // making sure the required data are present
    if(caloriesForm.checkValidity()){
        console.log("calculating");
        if(getInputData() === -1){
            return;
        }
    } else{
        // reporting missing required data
        caloriesForm.reportValidity();
    }
}

// function to handle when clear is pressed
function clear(e){
    e.preventDefault();
    caloriesForm.reset();
}

// populating data fields
function getInputData(){
    
    if(maleInput.checked)
        isMale = true;
    else if(femaleInput.checked)
        isFemale = false
    
    age = parseInt(ageInput.value);
    height = parseFloat(heightInput.value);
    weight = parseFloat(weightInput.value);
    
    freq = freqInput.value;

    // handle age restrictions
    if(isNaN(age) || age < 1 || age > 150){
        alert("Please enter a valid age between 1 and 150");       
        return -1;
    } 

    // handle height restrictions
    if(isNaN(height) || height < 1 || height > 500){
        alert("Please enter a valid height between 1 and 500");
        return -1;
    }

    // handle weight restrictions
    if(isNaN(weight) || weight < 1 || weight > 1000){
        alert("Please enter a valid height between 1 and 1000");
        return -1;
    }
    
    return 0;
}

//adding button functions
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);

