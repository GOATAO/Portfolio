// getting all needed elements
const caloriesForm = document.getElementById("calories-form")

const unitsToggle = document.getElementById("units-toggle") 

const maleInput = document.getElementById("male-input");
const femaleInput = document.getElementById("female-input");
const otherInput = document.getElementById("other-input");

const ageInput = document.getElementById("age-input");
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");

const freqInput = document.getElementById("training-frequency");

const calcBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");

const resDiv = document.getElementById("calories-result");

const bmrOutput = document.getElementById("bmr-span");
const proteinOutput = document.getElementById("protein-span");
const fatOutput = document.getElementById("fat-span");

// getting the calories elements
const caloriesGoalsOutput = document.querySelectorAll(".calories-span");

// units trackers
isMetric = false;
weightMulti = 1;
heightMulti = 1;

// data fields
let isMale = false;
let isFemale = false;
let age = 0;
let height = 0;
let weight = 0;
let freq = 0; 

// update the functionality of the program depending on units
function toggleUnits(){
    console.log("changing units")
    // update isMetric
    isMetric = !unitsToggle.checked

    // update display and multipliers
    if(isMetric){
        weightInput.setAttribute("placeholder", "kg");
        heightInput.setAttribute("placeholder", "cm");
        weightMulti = 1;
        heightMulti = 1;
    } else{
        weightInput.setAttribute("placeholder", "lbs");
        heightInput.setAttribute("placeholder", "in");
        weightMulti = 0.45;
        heightMulti = 2.54;
    }
}

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
        const protein = freq > 0 ? 
        [parseInt(1.4 * weight), parseInt(2 * weight)] : [parseInt(0.7 * weight), parseInt(0.8 * weight)]
        const fat = isMale ? 30 : isFemale? 20 : 15;

        //calorie goals
        const calorieGoals = getCalorieGoals(bmr);

        showResults(bmr, protein, fat, calorieGoals);
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
    weight = weightMulti * parseFloat(weightInput.value);
    height = heightMulti * parseFloat(heightInput.value);
    
    freq = freqInput.value;

    // handle age restrictions
    if(isNaN(age) || age < 1 || age > 150){
        alert("Please enter a valid age between 1 and 150");       
        return -1;
    } 
    
    // handle weight restrictions
    if(isNaN(weight) || weight < 1 || (isMetric && weight > 500) || (!isMetric && weight > 1000)){
        if(isMetric){
            alert("Please enter a valid height between 1kg and 500kg");
        } else{
            alert("Please enter a valid height between 1lbs and 1000lbs");
        }
        return -1;
    }

    // handle height restrictions
    if(isNaN(height) || height < 1 || (isMetric && height > 500) || (!isMetric && height > 100)){
        if(isMetric){
            alert("Please enter a valid height between 1cm and 500cm");
        }else{
            alert("Please enter a valid height between 1in and 100in");
        }
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
    return ((88.36 + 13.4 * weight + 4.8 * height - 5.68 * age) + 
        (447.59 + 9.25 * weight + 3.1 * height - 4.33 * age))/ 2;
}

// return the calorie goals of individual rounded to nearest 50
function getCalorieGoals(bmr){
    const mainCalories = bmr * (1.2 + freq * 0.175)
    return [1.2 * mainCalories, 1.1 * mainCalories, mainCalories, 
        0.9 * mainCalories, 0.8 * mainCalories].map((num) => Math.round(num/50) * 50);
}

// handle showing the result on page
function showResults(bmr, protein, fat, calorieGoals){
    // show the results panel
    resDiv.classList.remove("hide");
   
    // handle basic output
    bmrOutput.innerHTML = `<strong>BMR</strong><span>${bmr.toFixed(0)}kcal</span>`
    proteinOutput.innerHTML = `<strong>Protein</strong><span>${protein[0]}g-${protein[1]}g</span>`
    fatOutput.innerHTML = `<strong>Fat</strong><span>${fat}g</span>`

    // handle calorie goals output
    const caloriesGoalsLabels = ["Surplus", "Slight Surplus", "Maintenance", "Slight Deficit", "Deficit"];
    caloriesGoalsOutput.forEach((el, i) => {
      el.innerHTML = `<strong>${caloriesGoalsLabels[i]}</strong><span>${calorieGoals[i]}kcal</span>`  
    })
}


// adding toggle function
unitsToggle.addEventListener("change", toggleUnits)

// adding button functions
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);

