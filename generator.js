const password = document.querySelector("#paswd");
const rangeValue = document.querySelector(".value");
const slider = document.querySelector("input");
let checkboxUppercase = document.querySelector(".Uppercase");
let checkboxLowercase = document.querySelector(".Lowercase");
let checkboxNumber = document.querySelector(".Number");
let checkboxSymbols = document.querySelector(".Symbols");
const generateButton = document.getElementById("generate-button");
let level = document.getElementsByClassName("level")[0]; 
let Level1=document.getElementById("level1");
let Level2=document.getElementById("level2");
let Level3=document.getElementById("level3");
let Level4=document.getElementById("level4");
let allLevels=document.getElementsByClassName("level-show");
let copyButton=document.getElementsByClassName("image")[0];


function generateUppercase() {
    let character = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    return String.fromCharCode(character);
}

function generateLowercase() {
    let character = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    return String.fromCharCode(character);
}

function generateNumber() {
    return Math.floor(Math.random() * 10);
}

function generateSymbol() {
    let symbols = ['!', '@', '$', '%', '^', '&', "*", '+', "#"];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateSliderLength() {
    const value = slider.value;
    rangeValue.textContent = value;
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, rgb(60, 211, 60) ${percentage}%, rgb(200, 200, 200) ${percentage}%)`;
}

slider.addEventListener('input', updateSliderLength);


function generatePassword() {
    const passwordLength = slider.value;
    let generatedPassword = "";

    
    if (!checkboxUppercase.checked && !checkboxLowercase.checked && !checkboxNumber.checked && !checkboxSymbols.checked) {
        alert("Please select at least one character type.");
        return;
    }

    
    for (let i = 0; generatedPassword.length < passwordLength; i++) {
        if (checkboxUppercase.checked) {
            generatedPassword += generateUppercase();
        }
        if (checkboxLowercase.checked) {
            generatedPassword += generateLowercase();
        }
        if (checkboxNumber.checked) {
            generatedPassword += generateNumber();
        }
        if (checkboxSymbols.checked) { 
            generatedPassword += generateSymbol();
        }
    }

    generatedPassword = generatedPassword.slice(0, passwordLength);
    password.textContent = generatedPassword;

    const passwordStrength = checkPasswordStrength.passwordStrength(generatedPassword);

    level.textContent = passwordStrength.value;
    const ittarr = Array.from(allLevels);
    ittarr.forEach(element => {
        element.style.backgroundColor="white";
    });
   if(passwordStrength.id==0){
    Level1.style.backgroundColor="red";
   }
  else  if(passwordStrength.id==1){
    Level1.style.backgroundColor="yellow";
    Level2.style.backgroundColor="yellow"
   }
  else if(passwordStrength.id==2){
     Level1.style.backgroundColor="orange";
    Level2.style.backgroundColor="orange"
    Level3.style.backgroundColor="orange";
   }
  else if(passwordStrength.id=3){
    Level1.style.backgroundColor="green";
    Level2.style.backgroundColor="green"
    Level3.style.backgroundColor="green";
    Level4.style.backgroundColor="green"
   }


}
generateButton.addEventListener("click", generatePassword);


copyButton.addEventListener("click", function() {
    const generatedPassword = password.textContent;

    if (!generatedPassword) {
        alert("No password to copy. Please generate a password first.");
        return;
    }


    navigator.clipboard.writeText(generatedPassword).then(() => {
        alert("Password copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
});
