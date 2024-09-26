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
        // get input data
        if(getInputData() === -1){
            return;
        }

        // BMR calculations
        const bmr = getBMR();

        // macros calculations
        const protein = freq > 0 ? [1.4 * weight, 2 * weight] : [0.7 * weight, 0.8 * weight]
        const fat = isMale ? 30 : isFemale? 20 : 15;

        //calorie goals
        const calorieGoals = getCalorieGoals(bmr);

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
    
    isMale = maleInput.checked;
    isFemale = femaleInput.checked;
    
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

// calculates the individual BMR
function getBMR(){
    if(isMale){
        return 88.36 + 13.4 * weight + 4.8 * height - 5.68 * age;
    } 
    if(isFemale){
        return 447.59 + 9.25 * weight + 3.1 * height - 4.33 * age;
    }

    // handles other
    return (88.36 + 13.4 * weight + 4.8 * height - 5.68 * age) + 
        (447.59 + 9.25 * weight + 3.1 * height - 4.33 * age) / 2;
}

// return the calorie goals of individual rounded to nearest 50
function getCalorieGoals(bmr){
    const mainCalories = bmr * (1.2 + freq * 0.175)
    return [1.2 * mainCalories, 1.1 * mainCalories, mainCalories, 
        0.9 * mainCalories, 0.8 * mainCalories].map((num) => Math.round(num/50) * 50);
}

//adding button functions
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);

