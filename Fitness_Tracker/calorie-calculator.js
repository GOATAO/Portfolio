//getting all needed elements//
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

//getting the calories elements//
const caloriesOutput = document.querySelectorAll(".calories-span");


// function to handle when calculate is pressed
function calculate(e){
    e.preventDefault();
    if(caloriesForm.checkValidity()){
        console.log("calculating");
    } else{
        caloriesForm.reportValidity();
    }
}

// function to handle when clear is pressed
function clear(e){
    e.preventDefault();
    caloriesForm.reset();
}

//adding button functions
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);

